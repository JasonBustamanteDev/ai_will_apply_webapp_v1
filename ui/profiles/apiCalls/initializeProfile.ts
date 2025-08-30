import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers"; // prettier-ignore

export const initializeProfile = async (
    supabaseProjectUrl: string,
    newProfileName: string,
    existingData: RecordOrNull = null
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

const formatExistingData = (data: RecordOrNull) => {
    if (!data) return;

    return {
        [PROFILE_FORMS.PERSONAL_DETAILS]: data.personalDetails.data,
        [PROFILE_FORMS.LOCATION]: data.location.data,
        [PROFILE_FORMS.PREFERENCES]: data.preferences.data,
        [PROFILE_FORMS.LANGUAGES]: data.languages.data,
        [PROFILE_FORMS.SKILLS]: data.skills.data,
        [PROFILE_FORMS.WORK_EXPERIENCE]: data.workExperience.data,
        [PROFILE_FORMS.EDUCATION]: data.education.data,
        [PROFILE_FORMS.MEDIA_LINKS]: data.mediaLinks.data,
    };
};
