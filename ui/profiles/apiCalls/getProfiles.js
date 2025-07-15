import { getAuthSessionFromLocalStorage, extractFormattedDate } from "~/shared/client_helpers"; // prettier-ignore
import { personalDetailsSchema } from "../views/formValidation"; // prettier-ignore

const formatData = async (profileList) => {

    const rowPromises = profileList.map(async (x) => {
        const createdAt = x.createdAt;
        const updatedAt = x.updatedAt;

        const personalDetailsValidation = await personalDetailsSchema
            .validate(x.personalDetails)
            .then(() => true)
            .catch(() => false);


        return {
            profileName: x.profileName,
            lastUpdated: extractFormattedDate(updatedAt || createdAt),
            forms: {
                personalDetails: {
                    data: x.personalDetails,
                    isComplete: personalDetailsValidation,
                },
                location: { data: x.location },
                preferences: { data: x.preferences },
                languages: { data: x.languages },
                skills: { data: x.skills },
                workExperience: { data: x.workExperience },
                education: { data: x.education },
                mediaLinks: { data: x.mediaLinks },
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
