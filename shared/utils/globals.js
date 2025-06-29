// https://nuxt.com/docs/guide/directory-structure/shared

export const PAGE_URLS = {
    LOGIN: "/login",
    SEARCH: "/search",
    PROFILES: "/profiles",
    GUIDE: "/guide",
};

export const throwErrorObject = function (name, message, code = 500) {
    throw { name, message, code };
};

export const ERROR_MESSAGES = {
    GENERIC: "Something went wrong. Please reload the page and try again",
};
