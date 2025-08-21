export const MAX_PROFILES = 3;
export const PROFILES_TABLE_NAME = "jobSearchProfiles";

export const DEFAULT_SUCCESS_RETURN = { detail: "success" };

export const getCurrentUTCTimestamp = () => new Date().toISOString();

export const detailObject = (msg: string) => ({ detail: msg });
