// https://nuxt.com/docs/guide/directory-structure/shared

export const PAGE_URLS = {
    LOGIN: "/login",
    SEARCH: "/search",
    PROFILES: "/profiles",
    PROFILE_DATA: "/profiles/data",
    GUIDE: "/guide",
};

export const throwErrorObject = function (
    name: string,
    message: string,
    code = 500
) {
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

export const COLLAPSE_NAMES = {
    PERSONAL_DETAILS: "personalDetailsCollapse",
    LOCATION: "locationCollapse",
    PREFERENCES: "preferencesCollapse",
    LANGUAGES: "languagesCollapse",
    SKILLS: "skillsCollapse",
    WORK_EXPERIENCE: "workExperienceCollapse",
    EDUCATION: "educationCollapse",
    MEDIA_LINKS: "mediaLinksCollapse",
};

// Explains if certain forms are mandatory or not
// tech_debt: Any updates to this object means you must edit your kpi calculations. CTRL F tech_debt: 1ab89
export const PROFILE_REQUIREMENTS = {
    // Mandatory forms below
    PERSONAL_DETAILS: true,
    LOCATION: true,
    PREFERENCES: true,
    LANGUAGES: true,
    WORK_EXPERIENCE: true,
    EDUCATION: true,

    // Optional forms below
    SKILLS: false,
    MEDIA_LINKS: false,
};
