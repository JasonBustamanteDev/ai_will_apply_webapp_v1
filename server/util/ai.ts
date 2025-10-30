const geminiModels = {
    0: "gemini-2.0-flash-lite", // 0.075 + 0.30
    1: "gemini-2.5-flash-lite", // 0.10 + 0.40 (speedy)
    2: "gemini-2.0-flash", // 0.15 + 0.60

    // gemini docs: https://genkit.dev/docs/integrations/google-genai/
    // gemini models: https://cloud.google.com/vertex-ai/generative-ai/pricing#gemini-models-2.5
};

const gptModels = {
    0: "gpt-5-nano", // 0.05 + 0.40 (reasoning. Fastest, most cost-efficient version of GPT-5)
    1: "gpt-4.1-nano", // 0.10 + 0.40 (non reasoning. Fastest, most cost-efficient version of GPT-4.1)

    // openai plugin: https://genkit.dev/docs/integrations/openai/
    // openai models: https://platform.openai.com/docs/models/compare
};

const deepseekModels = {
    0: "deepseek-chat", // 0.28 + 0.42 (way faster)
    1: "deepseek-reasoner", // 0.28 + 0.42

    // deepseek docs: https://genkit.dev/docs/integrations/deepseek/
};

const NO_ANSWER_INDICATOR = "NOT_APPLICABLE";
export const CHOSEN_GEMINI_MODEL = geminiModels[0];
export const CHOSEN_GPT_MODEL = gptModels[0];
export const CHOSEN_DEEPSEEK_MODEL = deepseekModels[0];


export const generateTextPrompt = (
    unresolvedTextQuestions: any,
    sessionData: any
) => {
    return [
        "You are a job seeker who is answering mock job posting questions for practice.",
        "Be concise and only return answers without an explanation - the shorter the better.",
        `My personalData is: ${JSON.stringify(sessionData)} .`,
        "Use personalData to answer questions when possible.",
        "Generate reasonable answers when personalData does not suffice. Try your absolute hardest to give some sort of real sounding answer.",
        `If you are absolutely unable to answer, do not explain why - simply return ${NO_ANSWER_INDICATOR}`,
        "If you are unsure about yearsOfExperience, default to using yearsOfExperience in personalData.",
        `For the answers, return a JSON array of strings`,
        `QUESTIONS LIST: ${JSON.stringify(unresolvedTextQuestions)}`, // prettier-ignore
    ].join(" ");
};

export const generateMultipleChoicePrompt = (
    unresolvedMultipleChoiceQuestions: any,
    sessionData: any
) => {
    return [
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
        "If asked about seasonal work, or being able to work part or full time, agree to it. Answer as if you are available whenever the company needs you.",
        // "If asked about whether you require sponsorship of any kind, refer to personalData's 'requireEmploymentSponsorship' key value pair",
        // "If asked about whether you have a criminal record, always deny since you've never committed any crimes.",
        `QUESTIONS_LIST: ${JSON.stringify(unresolvedMultipleChoiceQuestions)}`, // prettier-ignore
    ].join(" ");
};
