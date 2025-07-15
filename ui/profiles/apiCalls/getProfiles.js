import { getAuthSessionFromLocalStorage, extractFormattedDate } from "~/shared/client_helpers"; // prettier-ignore

const formatData = (profileList) => {
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

    return profileList.map((x) => {
        const createdAt = x.createdAt;
        const updatedAt = x.updatedAt;
        return {
            profileName: x.profileName,
            lastUpdated: extractFormattedDate(updatedAt || createdAt),
            forms: {
                personalDetails: { data: x.personalDetails },
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
};

export const getProfiles = async (supabaseProjectUrl) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const result = await $fetch("/api/profiles/readAll", {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    return formatData(result.data);
};
