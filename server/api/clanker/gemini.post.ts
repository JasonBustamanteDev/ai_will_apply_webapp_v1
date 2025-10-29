import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { detailObject } from "~/server/util/server_constants";
import { genkit } from "genkit";
import { googleAI } from "@genkit-ai/google-genai";

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
    const SEPERATOR = "!!@!!";

    try {
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const env_config = useRuntimeConfig(event);
        const {
            sessionData,
            unresolvedMultipleChoiceQuestions,
            unresolvedTextQuestions,
        } = await readBody(event);

        const ai = genkit({
            plugins: [googleAI({ apiKey: env_config.GEMINI_API_KEY })],
        });

        const answersDict: { [key: string]: any } = {};

        if (unresolvedTextQuestions.length) {
            const { text: textAnswers } = await ai.generate({
                model: googleAI.model(CHOSEN_MODEL, { temperature: 0.1 }),
                prompt: [
                    "You are a job seeker who is answering mock job posting questions for practice.",
                    "Be concise and only return answers without an explanation - the shorter the better.",
                    `My personalData is: ${JSON.stringify(sessionData)} .`,
                    "Use personalData to answer questions when possible.",
                    "Generate reasonable answers when personalData does not suffice.",
                    `If you are absolutely unable to answer, do not explain why - simply return ${NO_ANSWER_INDICATOR}`,
                    "If you are unsure about yearsOfExperience, default to using yearsOfExperience in personalData.",
                    `For the answers, return 1 string where the seperator between individual answers is ${SEPERATOR}`,
                    `QUESTIONS LIST: ${JSON.stringify(
                        unresolvedTextQuestions
                    )}`,
                ].join(" "),
            });

            const textAnswersList = textAnswers
                .trim()
                .split(SEPERATOR)
                .map((str) => str.trim());

            for (let x = 0; x < textAnswersList.length; x++) {
                const currentAnswer = textAnswersList[x];
                const currentQuestion = unresolvedTextQuestions[x];
                answersDict[currentQuestion] = currentAnswer;
            }
        }

        if (unresolvedMultipleChoiceQuestions.length) {
            const { text: multipleChoiceAnswers } = await ai.generate({
                model: googleAI.model(CHOSEN_MODEL, { temperature: 0.1 }),
                prompt: [
                    "You are a job seeker who is answering mock job posting questions for practice.",
                    `My personalData is: ${JSON.stringify(sessionData)} .`,
                    "Use personalData to help when answering questions if possible.",
                    "QUESTIONS_LIST will be provided as an array of objects with 3 properties.",
                    "The 3 object properties are: 'question', 'options', 'canHaveMultipleAnswers'",
                    "'question' is the question I need you to answer.",
                    "'options' is a list permitted answers you must choose from. Pick the one that makes the most sense.",
                    "'canHaveMultipleAnswers' is a boolean telling if you can pick multiple answers from 'options'.",
                    "If 'canHaveMultipleAnswers' is true, you are allowed to pick 1 or multiple 'option' values as answers.",
                    "For your answer, return a JSON array of arrays. Each subarray should contain the options chosen per each question.",
                    `QUESTIONS_LIST: ${JSON.stringify(
                        unresolvedMultipleChoiceQuestions
                    )}`,
                ].join(" "),
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

        return {
            detail: "successor",
            data: answersDict,
        };
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
