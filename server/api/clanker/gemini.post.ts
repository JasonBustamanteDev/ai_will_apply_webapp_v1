import { getSupabaseClient } from "~/server/util/getSupabaseClient";
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { detailObject, PROFILES_TABLE_NAME } from "~/server/util/server_constants"; // prettier-ignore
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";

export default defineEventHandler(async (event) => {
    try {
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const env_config = useRuntimeConfig(event);
        const body = await readBody(event);

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

        const { text: clankerAnswer } = await ai.generate({
            model: googleAI.model(GEMINI_MODELS[2], {
                temperature: 0.1,
            }),
            prompt: [
                "I'm providing an object with 2 fields: unresolvedQuestions and profileCoreData.",
                "Return 1 string where the seperator between answers is !!!",
                "Answer as if you were answering questions on a mock job posting and want to get hired.",
                "Be concise and only return the answer without an explanation - the shorter the better.",
                "If you are unsure about yearsOfExperience, default to using yearsOfExperience in profileCoreData.",
                "Try to use profileCoreData to answer any of the questions if possible.",
                "If you are unable to answer, do not explain why - simply return NOT_APPLICABLE",
                JSON.stringify(body),
            ].join(" "),
        });

        const parsedAnswer = clankerAnswer
            .trim()
            .split("!!!")
            .map((str) => str.trim());

        return { detail: "successor", answer: parsedAnswer };
    } catch (err: any) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong."; // prettier-ignore
        setResponseStatus(event, error_code);
        return detailObject(error_message);
    }
});
