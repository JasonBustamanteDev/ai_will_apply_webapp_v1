import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers"; // prettier-ignore

export const initializeProfile = async (
    supabaseProjectUrl,
    newProfileName,
    existingData = null
) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const newName = encodeURI(newProfileName);

    await $fetch(`/api/profiles/initialize`, {
        method: "POST",
        body: {
            newProfileName: newName,
            existingData: formatExistingData(existingData),
        },
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });
};

const formatExistingData = (data) => {
    if (!data) return;

    return {
        personalDetails: data.personalDetails.data,
        location: data.location.data,
        preferences: data.preferences.data,
        languages: data.languages.data,
        skills: data.skills.data,
        workExperience: data.workExperience.data,
        education: data.education.data,
        mediaLinks: data.mediaLinks.data,
    };
};
