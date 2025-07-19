import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers"; // prettier-ignore

export const getSingleProfile = async (
    supabaseProjectUrl,
    encodedDynamicProfileName
) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const result = await $fetch(
        `/api/profiles/read/${encodedDynamicProfileName}`,
        {
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        }
    );

    return await formatSingleProfileData(result.data);
};

const formatSingleProfileData = async (x) => {
    return {
        profileName: x.profileName,
        createdAt: x.createdAt,
        updatedAt: x.updatedAt,
        form: {
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
};
