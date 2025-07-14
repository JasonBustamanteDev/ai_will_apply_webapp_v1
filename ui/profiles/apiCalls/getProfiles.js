import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers";

const formatData = () => {
    const validationObject = {
        personalDetails: null,
        location: null,
        preferences: null,
        languages: null,
        skills: null,
        workExperience: null,
        education: null,
        mediaLinks: null,
    };
};

export const getProfiles = async (supabaseProjectUrl) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const result = await $fetch("/api/profiles/readAll", {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    return result.data;
};
