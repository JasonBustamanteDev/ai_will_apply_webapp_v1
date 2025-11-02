const geminiModels = {
    0: "gemini-2.0-flash-lite", // 0.075 + 0.30 (speedy, non thinking)
    1: "gemini-2.5-flash-lite", // 0.10 + 0.40 (speedy, hybrid thinking. less nonsense answers)
    2: "gemini-2.0-flash", // 0.15 + 0.60

    // gemini docs: https://genkit.dev/docs/integrations/google-genai/
    // gemini models: https://cloud.google.com/vertex-ai/generative-ai/pricing#gemini-models-2.5
};

const gptModels = {
    0: "gpt-5-nano", // 0.05 + 0.40 (reasoning. Fastest, most cost-efficient version of GPT-5)
    1: "gpt-4.1-nano", // 0.10 + 0.40 (non reasoning. faster than reasoning models)

    // openai plugin: https://genkit.dev/docs/integrations/openai/
    // openai models: https://platform.openai.com/docs/models/compare
};

const deepseekModels = {
    0: "deepseek-chat", // 0.28 + 0.42 (way faster)
    1: "deepseek-reasoner", // 0.28 + 0.42

    // deepseek docs: https://genkit.dev/docs/integrations/deepseek/
};

const NO_ANSWER_INDICATOR = "NOT_APPLICABLE";
export const CHOSEN_GEMINI_MODEL = geminiModels[1];
export const CHOSEN_GPT_MODEL = gptModels[1];
export const CHOSEN_DEEPSEEK_MODEL = deepseekModels[0];

enum PromptSubstrings {
    PERSONAL_DATA = "PERSONAL_DATA",
    QUESTIONS_LIST = "QUESTIONS_LIST",
}

export const generateTextPrompt = (
    unresolvedTextQuestions: any,
    profileData: any
) => {
    const prompt =  `
        ### ROLE ###
        You are a job seeker who is answering mock job posting questions for practice.
        The questions will be referred to as ${PromptSubstrings.QUESTIONS_LIST} in this prompt.

        ### CONSTRAINTS ###
        For the answers, return a JSON array of strings.
        Be concise and only return answers without an explanation - the shorter the better.

        Use ${PromptSubstrings.PERSONAL_DATA} to answer questions when possible.

        Generate reasonable answers when ${PromptSubstrings.PERSONAL_DATA} does not suffice. 
        Try your absolute hardest to give some sort of real sounding answer.
        If you are absolutely unable to answer, do not explain why - simply return ${NO_ANSWER_INDICATOR}

        ### SUGGESTIONS FOR NICHE QUESTIONS ###
        If you are unsure about years of experience, default to using yearsOfExperience in ${PromptSubstrings.PERSONAL_DATA}.

        ### ${PromptSubstrings.PERSONAL_DATA} ###
        ${JSON.stringify(profileData)}

        ### ${PromptSubstrings.QUESTIONS_LIST} ###
        ${JSON.stringify(unresolvedTextQuestions)}
    `;

    return prompt
};

export const generateMultipleChoicePrompt = (
    unresolvedMultipleChoiceQuestions: any,
    profileData: any
) => {
    const prompt =  `
        ### ROLE ###
        You are a job seeker who is answering mock job posting questions for practice.
        The questions will be referred to as ${PromptSubstrings.QUESTIONS_LIST} in this prompt.

        ### ${PromptSubstrings.QUESTIONS_LIST} EXPLANATION ###
        ${PromptSubstrings.QUESTIONS_LIST} will be provided as an array of objects with 3 properties.
        The 3 object properties are: 'question', 'options', and 'canHaveMultipleAnswers' .
        'question' is the question I need you to answer.
        'options' is a list permitted answers you must choose from. Pick the one that makes the most sense.
        'canHaveMultipleAnswers' is a boolean telling if you can pick multiple answers from 'options'. If 'canHaveMultipleAnswers' is true, you are allowed to pick 1 or multiple 'option' values as answers.

        ### CONSTRAINTS ###
        For your answer, return a JSON array of arrays. 
        Each subarray should contain the options chosen per each question.

        ### OPTIONS MUST REMAIN UNCHANGED WHEN PART OF THE ANSWER ###
        Do not change any of the 'options' string values when you include them as part of the answer.

        Example of incorrect answer: 
            options = ['Lemonade', 'Pepsi Cola'] answer = ['Pepsi']
        Explanation of incorrect answer: 
            The 'Pepsi Cola' option was changed to be 'Pepsi' in the answer, which is an error.
        Example of correct answer:
            options = ['Lemonade', 'Pepsi Cola'] answer = ['Pepsi Cola']

        ### SUGGESTIONS FOR NICHE QUESTIONS ###
        - If asked about seasonal work, or being able to work part or full time, agree to it. Answer as if you are available whenever the company needs you.
        - If given a list of locations that you are able to work in, select them all. Answer as if you are available to work anywhere worldwide both in-person and remote.
        - If asked about whether you require sponsorship of any kind, refer to the 'requireEmploymentSponsorship' key value pair in ${PromptSubstrings.PERSONAL_DATA} 
        - If asked about whether you have a criminal record, always deny since you've never committed any crimes.

        ### ${PromptSubstrings.PERSONAL_DATA} ###
        ${JSON.stringify(profileData)}

        ### ${PromptSubstrings.QUESTIONS_LIST} ###
        ${JSON.stringify(unresolvedMultipleChoiceQuestions)}
    `;

    return prompt
};
