import { inRange } from "lodash";

export const getAuthSessionFromLocalStorage = function (supabase_project_url) {
    const trimmed_project_url = supabase_project_url
        .replace(/^https:\/\//, "")
        .replace(/\.supabase\.co$/, "");

    const localStorageKey = `sb-${trimmed_project_url}-auth-token`;
    const sessionString = localStorage.getItem(localStorageKey);

    return sessionString ? JSON.parse(sessionString) : null;
};

export const verifyMinStringLength = (value, requiredLength) =>
    value && value.replace(/\s/g, "").length >= requiredLength;

export const cleanPhoneNumber = (str) => str.replace(/[\s\-]/g, "");

export const emptyOrMinLengthStringAccepted = function (value, strLength = 1) {
    // Accepts empty strings, but if a string is provided we demand a min length with space chars excluded
    if (!value || value === "") return true;
    return verifyMinStringLength(value, strLength);
};

export const isValidYearMonth = function (dateString) {
    // Check exact format with regex
    const yearMonthRegex = /^\d{4}-\d{2}$/;
    if (!yearMonthRegex.test(dateString)) {
        return false;
    }

    // Parse year and month
    const [year, month] = dateString.split("-").map(Number);

    // Validate ranges
    const isValidYear = inRange(year, 1920, 2100); // reasonable year range
    const isValidMonth = inRange(month, 1, 13); // 1-12

    return isValidYear && isValidMonth;
};
