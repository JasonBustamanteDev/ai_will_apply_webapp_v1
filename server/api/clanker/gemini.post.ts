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
    const SEPERATOR = "!!@!!";

    try {
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const env_config = useRuntimeConfig(event);
        const { sessionData, unresolvedMultipleChoiceQuestions, unresolvedTextQuestions } = await readBody(event); // prettier-ignore

        const ai = genkit({
            plugins: [googleAI({ apiKey: env_config.GEMINI_API_KEY })],
        });

        const answersDict: { [key: string]: string } = {};
        const answersDict2: { [key: string]: string } = {};

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

        // if (unresolvedMultipleChoiceQuestions.length) {
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
                "For your answer, return a string where each set of chosen options is between square brackets.",
                `The seperator between individual answers is ${SEPERATOR}`,
                // `The answers value should be a string where the seperator is ${SEPERATOR}`,
                `QUESTIONS_LIST: ${JSON.stringify(
                    unresolvedMultipleChoiceQuestions
                )}`,
            ].join(" "),
        });
        const multipleChoiceAnswersList = multipleChoiceAnswers
            .trim()
            .split(SEPERATOR)
            .map((str) => str.trim());

        // for (let x = 0; x < multipleChoiceAnswersList.length; x++) {
        //     const currentAnswer = multipleChoiceAnswersList[x];
        //     const currentQuestion = unresolvedMultipleChoiceQuestions[x];
        //     answersDict2[currentQuestion] = currentAnswer;
        // }
        // }

        // DIAGNOSTICS CODE BELOW (CAN COMMENT OUT LATER): Save which answers the AI was not able to answer
        // await failedAiAnswersDiagnostic(answerList, NO_ANSWER_INDICATOR, CHOSEN_MODEL, unresolvedTextQuestions, accessToken, event); // prettier-ignore
        console.log(answersDict2)
        return {
            detail: "successor",
            data: answersDict,
            mc: multipleChoiceAnswersList,
        };
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
