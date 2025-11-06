export const MAX_PROFILES = 4;
export const PROFILES_TABLE_NAME = "jobSearchProfiles";
export const UNANSWERED_QUESTIONS_TABLE_NAME = "unansweredQuestions";

export const DEFAULT_SUCCESS_RETURN = { detail: "success" };

export const getCurrentUTCTimestamp = () => new Date().toISOString();

export const detailObject = (msg: string) => ({ detail: msg, data: null });
