import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { detailObject } from "~/server/util/server_constants";
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";
import { generateTextPrompt, generateMultipleChoicePrompt, CHOSEN_GEMINI_MODEL } from "~/server/util/ai"; // prettier-ignore

export default defineEventHandler(async (event) => {
    try {
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const env_config = useRuntimeConfig(event);
        const {
            sessionData,
            unresolvedMultipleChoiceQuestions = [],
            unresolvedTextQuestions = [],
        } = await readBody(event);

        const ai = genkit({
            plugins: [googleAI({ apiKey: env_config.GEMINI_API_KEY })],
        });

        const answersDict: { [key: string]: any } = {};

        if (unresolvedTextQuestions.length) {
            const { text: textAnswers } = await ai.generate({
                model: googleAI.model(CHOSEN_GEMINI_MODEL, { temperature: 0 }),
                prompt: generateTextPrompt(
                    unresolvedTextQuestions,
                    sessionData
                ),
            });

            const parsedTextAnswers = parseJsonAiAnswer(textAnswers);

            for (let x = 0; x < parsedTextAnswers.length; x++) {
                const currentAnswer = parsedTextAnswers[x];
                const currentQuestion = unresolvedTextQuestions[x];
                answersDict[currentQuestion] = currentAnswer;
            }
        }

        if (unresolvedMultipleChoiceQuestions.length) {
            const { text: multipleChoiceAnswers } = await ai.generate({
                model: googleAI.model(CHOSEN_GEMINI_MODEL, { temperature: 0 }),
                prompt: generateMultipleChoicePrompt(
                    unresolvedMultipleChoiceQuestions,
                    sessionData
                ),
            });

            const parsedMultipleChoiceAnswers = parseJsonAiAnswer(
                multipleChoiceAnswers
            );

            for (let x = 0; x < parsedMultipleChoiceAnswers.length; x++) {
                const currentAnswer = parsedMultipleChoiceAnswers[x];
                const currentQuestion =
                    unresolvedMultipleChoiceQuestions[x]["question"];
                answersDict[currentQuestion] = currentAnswer;
            }
        }

        return { detail: "success", data: answersDict };
    } catch (err: any) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong."; // prettier-ignore
        setResponseStatus(event, error_code);
        return detailObject(error_message);
    }
});

function parseJsonAiAnswer(textAnswer: string) {
    if (textAnswer.startsWith("```json")) {
        textAnswer = textAnswer.slice(7);
    }
    if (textAnswer.endsWith("```")) {
        textAnswer = textAnswer.substring(0, textAnswer.length - 3);
    }
    return JSON.parse(textAnswer);
}
