import { getSupabaseClient, getSupabaseUserDetails } from "~/server/util/getSupabaseClient"; // prettier-ignore
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { detailObject, UNANSWERED_QUESTIONS_TABLE_NAME } from "~/server/util/server_constants"; // prettier-ignore
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
import { Object } from "lodash";

export default defineEventHandler(async (event) => {
    const NO_ANSWER_INDICATOR = "NOT_APPLICABLE";

    try {
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const env_config = useRuntimeConfig(event);

        const body = await readBody(event);
        const unresolvedQuestions = body["unresolvedQuestions"] as string[];

        const ai = genkit({
            plugins: [googleAI({ apiKey: env_config.GEMINI_API_KEY })],
        });

        const GEMINI_MODELS = {
            0: "gemini-2.5-pro", // 1.25 + 10

            1: "gemini-2.5-flash", // 0.3 + 2.50
            2: "gemini-2.5-flash-lite", // 0.10 + 0.40 (speedy)

            3: "gemini-2.0-flash", // 0.10 + 0.40
            4: "gemini-2.0-flash-lite",
        };
        const CHOSEN_MODEL = GEMINI_MODELS[2];

        const { text: clankerAnswer } = await ai.generate({
            model: googleAI.model(CHOSEN_MODEL, { temperature: 0.1 }),
            prompt: [
                "I'm providing an object with 2 fields: unresolvedQuestions and profileCoreData.",
                "Return 1 string where the seperator between answers is !!!",
                "Answer as if you were answering questions on a mock job posting and want to get hired.",
                "Be concise and only return the answer without an explanation - the shorter the better.",
                "If you are unsure about yearsOfExperience, default to using yearsOfExperience in profileCoreData.",
                "Try to use profileCoreData to answer any of the questions if possible.",
                `If you are unable to answer, do not explain why - simply return ${NO_ANSWER_INDICATOR}`,
                JSON.stringify(body),
            ].join(" "),
        });

        const answerList = clankerAnswer
            .trim()
            .split("!!!")
            .map((str) => str.trim());

        const answersDict: { [key: string]: string } = {};
        for (let x = 0; x < answerList.length; x++) {
            const currentAnswer = answerList[x];
            const currentQuestion = unresolvedQuestions[x];
            answersDict[currentQuestion] = currentAnswer;
        }

        // RESEARCH ONLY (CAN DISABLE LATER): Save which answers the AI was not able to answer
        const failedAnswerRows = [];
        for (let i = 0; i < answerList.length; i++) {
            const currentAnswer = answerList[i];
            if (currentAnswer !== NO_ANSWER_INDICATOR) continue;

            failedAnswerRows.push({
                ai_model: CHOSEN_MODEL,
                question: unresolvedQuestions[i],
            });
        }
        const supabaseClient = getSupabaseClient(event, accessToken);
        const { error: insertError } = await supabaseClient
            .from(UNANSWERED_QUESTIONS_TABLE_NAME)
            .insert(failedAnswerRows);

        return { detail: "successor", data: answersDict };
    } catch (err: any) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong."; // prettier-ignore
        setResponseStatus(event, error_code);
        return detailObject(error_message);
    }
});
