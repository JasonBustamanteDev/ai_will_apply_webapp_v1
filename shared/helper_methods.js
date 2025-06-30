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


export const cleanPhoneNumber = (str) => str.replace(/[\s\-]/g, '')