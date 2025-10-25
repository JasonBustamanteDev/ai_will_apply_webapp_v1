import { getSupabaseClient } from "~/server/util/getSupabaseClient"; // prettier-ignore
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { detailObject, UNANSWERED_QUESTIONS_TABLE_NAME } from "~/server/util/server_constants"; // prettier-ignore
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
import type { H3Event, EventHandlerRequest } from "h3";

export default defineEventHandler(async (event) => {
    const GEMINI_MODELS = {
        0: "gemini-2.5-pro", // 1.25 + 10

        1: "gemini-2.5-flash", // 0.3 + 2.50
        2: "gemini-2.5-flash-lite", // 0.10 + 0.40 (speedy)

        3: "gemini-2.0-flash", // 0.10 + 0.40
        4: "gemini-2.0-flash-lite",
    };
    const CHOSEN_MODEL = GEMINI_MODELS[2];
    const NO_ANSWER_INDICATOR = "NOT_APPLICABLE";

    try {
        const { accessToken } = checkIfUserIsAuthenticated(event);

        const env_config = useRuntimeConfig(event);
        const body = await readBody(event);
        const ai = genkit({
            plugins: [googleAI({ apiKey: env_config.GEMINI_API_KEY })],
        });

        // First call: set up the data
        const setupResponse = await ai.generate({
            system: [
                {
                    text: [
                        "You are a person who is currently filling out a mock job posting for practice.",
                        "Remember the personalData provided and use it to answer subsequent questions.",
                        "Be concise and only return the answer without an explanation - the shorter the better.",
                        `If you are unable to answer, simply return ${NO_ANSWER_INDICATOR}`,
                    ].join(" "),
                },
            ],
            model: googleAI.model(CHOSEN_MODEL, { temperature: 0.1 }),
            messages: [
                {
                    role: "user",
                    content: [
                        {
                            text:
                                "Here is my personalData: " +
                                JSON.stringify(body.profileCoreData),
                        },
                    ],
                },
            ],
        });

        // Build message history
        let history = [
            {
                role: "user" as const,
                content: [
                    {
                        text:
                            "Here is my personalData: " +
                            JSON.stringify(body.profileCoreData),
                    },
                ],
            },
            {
                role: "model" as const,
                content: [{ text: setupResponse.text }],
            },
        ];

        // Ask questions one by one
        const questions = [
            "What is your passion?",
            "Describe your work history",
        ];

        const answers = [];
        for (const question of questions) {
            const response = await ai.generate({
                system: [
                    {
                        text: [
                            "You are a person filling out a job posting.",
                            "Answer using the personalData provided earlier.",
                            "Be concise - just the answer, no explanation.",
                            `If unable to answer, return ${NO_ANSWER_INDICATOR}`,
                        ].join(" "),
                    },
                ],
                model: googleAI.model(CHOSEN_MODEL, { temperature: 0.1 }),
                messages: [
                    ...history,
                    {
                        role: "user",
                        content: [{ text: question }],
                    },
                ],
            });

            history.push(
                {
                    role: "user" as const,
                    content: [{ text: question }],
                },
                {
                    role: "model" as const,
                    content: [{ text: response.text }],
                }
            );

            answers.push(response.text);
        }

        return { detail: "successor", data: answers };

        const unresolvedQuestions = body["unresolvedQuestions"] as string[];

        // const { text: clankerAnswer } = await ai.generate({
        //     model: googleAI.model(CHOSEN_MODEL, { temperature: 0.1 }),
        //     prompt: [
        //         "I'm providing an object with 2 fields: unresolvedQuestions and profileCoreData.",
        //         "Return 1 string where the seperator between answers is !!!",
        //         "Answer as if you were answering questions on a mock job posting and want to get hired.",
        //         "Be concise and only return the answer without an explanation - the shorter the better.",
        //         "If you are unsure about yearsOfExperience, default to using yearsOfExperience in profileCoreData.",
        //         "Try to use profileCoreData to answer any of the questions if possible.",
        //         `If you are unable to answer, do not explain why - simply return ${NO_ANSWER_INDICATOR}`,
        //         JSON.stringify(body),
        //     ].join(" "),
        // });

        // const answerList = clankerAnswer
        //     .trim()
        //     .split("!!!")
        //     .map((str) => str.trim());

        // const answersDict: { [key: string]: string } = {};
        // for (let x = 0; x < answerList.length; x++) {
        //     const currentAnswer = answerList[x];
        //     const currentQuestion = unresolvedQuestions[x];
        //     answersDict[currentQuestion] = currentAnswer;
        // }

        // DIAGNOSTICS CODE BELOW (CAN COMMENT OUT LATER): Save which answers the AI was not able to answer
        // await failedAiAnswersDiagnostic(answerList, NO_ANSWER_INDICATOR, CHOSEN_MODEL, unresolvedQuestions, accessToken, event); // prettier-ignore

        // return { detail: "successor", data: answersDict };
    } catch (err: any) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong."; // prettier-ignore
        setResponseStatus(event, error_code);
        return detailObject(error_message);
    }
});

async function failedAiAnswersDiagnostic(
    answerList: string[],
    NO_ANSWER_INDICATOR: string,
    CHOSEN_MODEL: string,
    unresolvedQuestions: string[],
    accessToken: string,
    event: H3Event<EventHandlerRequest>
) {
    const failedAnswerRows = [];
    for (let i = 0; i < answerList.length; i++) {
        if (answerList[i] !== NO_ANSWER_INDICATOR) continue;
        failedAnswerRows.push({
            ai_model: CHOSEN_MODEL,
            question: unresolvedQuestions[i],
        });
    }
    const supabaseClient = getSupabaseClient(event, accessToken);
    const { error: insertError } = await supabaseClient
        .from(UNANSWERED_QUESTIONS_TABLE_NAME)
        .insert(failedAnswerRows);
}

/*
[
                        "You are a person who is currently filling out a mock job posting for practice.",
                        "The first prompt will provide personalData about this person.",
                        "The prompts afterwards will contain questions.",

                        "Answer the questions using personalData if possible.",
                        "Be concise and only return the answer without an explanation - the shorter the better.",
                        "If you are unsure about yearsOfExperience, default to using yearsOfExperience in personalData.",
                        `If you are unable to answer, do not explain why - simply return ${NO_ANSWER_INDICATOR}`,

                        "Questions will be provided as arrays containing objects. I will explain what some fields mean:",
                        "- 'question' is the question we need the AI to answer.",
                        "- 'requiredAnswerType' tells what data type the answer must be. For example, if the requiredAnswerType is 'integer', the answer should be an integer like '4', not a string like '4 years'.",
                        "- 'options' is a list that provides the permitted answers for the object's 'question'.",
                        "- 'canHaveMultipleAnswers' is a boolean telling if we can have multiple answers chosen from the 'options' list. If 'canHaveMultipleAnswers' equals true, you may select multiple answers, but are not forced to do so.",
                    ].join(" "),
*/