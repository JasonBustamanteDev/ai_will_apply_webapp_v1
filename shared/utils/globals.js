// https://nuxt.com/docs/guide/directory-structure/shared

export const PAGE_URLS = {
    LOGIN: "/login",
    SEARCH: "/search",
    PROFILES: "/profiles",
    PROFILE_DATA: "/profiles/data",
    GUIDE: "/guide",
};

export const throwErrorObject = function (name, message, code = 500) {
    throw { name, message, code };
};

export const ERROR_MESSAGES = {
    GENERIC: "Something went wrong. Please reload the page and try again.",
    RELOAD: "Please reload the page and try again.",
};

export const PROFILE_FORMS = {
    PERSONAL_DETAILS: "personalDetails",
    LOCATION: "location",
    PREFERENCES: "preferences",
    LANGUAGES: "languages",
    SKILLS: "skills",
    WORK_EXPERIENCE: "workExperience",
    EDUCATION: "education",
    MEDIA_LINKS: "mediaLinks",
};
