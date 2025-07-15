import { getAuthSessionFromLocalStorage, extractFormattedDate } from "~/shared/client_helpers"; // prettier-ignore
import { personalDetailsSchema, locationSchema, preferenceSchema, educationSchema, socialSchema, skillsValidator, workExperienceValidator, languageValidator } from "../views/formValidation"; // prettier-ignore

const formatData = async (profileList) => {
    const rowPromises = profileList.map(async (x) => {
        const createdAt = x.createdAt;
        const updatedAt = x.updatedAt;

        const personalDetailsValidation = await personalDetailsSchema
            .validate(x.personalDetails)
            .then(() => true)
            .catch(() => false);
        const locationValidation = await locationSchema
            .validate(x.location)
            .then(() => true)
            .catch(() => false);
        const preferenceValidation = await preferenceSchema
            .validate(x.preferences)
            .then(() => true)
            .catch(() => false);
        const educationValidation = await educationSchema
            .validate(x.education)
            .then(() => true)
            .catch(() => false);
        const mediaValidation = await socialSchema
            .validate(x.mediaLinks)
            .then(() => true)
            .catch(() => false);

        const languagesValidation = languageValidator(x.languages);
        const skillsValidation = languageValidator(x.skills);
        const workExperienceValidation = languageValidator(x.workExperience);

        return {
            profileName: x.profileName,
            lastUpdated: extractFormattedDate(updatedAt || createdAt),

            // prettier-ignore
            forms: {
                personalDetails: { data: x.personalDetails, isComplete: personalDetailsValidation },
                location: { data: x.location, isComplete: locationValidation },
                preferences: { data: x.preferences, isComplete: preferenceValidation },

                languages: { data: x.languages, isComplete: languagesValidation },
                skills: { data: x.skills, isComplete: skillsValidation },
                workExperience: { data: x.workExperience, isComplete: workExperienceValidation },

                education: { data: x.education, isComplete: educationValidation },
                mediaLinks: { data: x.mediaLinks, isComplete: mediaValidation },
            },
        };
    });

    return await Promise.all(rowPromises);
};

export const getProfiles = async (supabaseProjectUrl) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const result = await $fetch("/api/profiles/readAll", {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    return await formatData(result.data);
};
