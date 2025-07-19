import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers"; // prettier-ignore

export const updateProfile = async (
    supabaseProjectUrl,
    encodedProfileName,
    updateData
) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);

    await $fetch(`/api/profiles/update`, {
        method: "PATCH",
        body: {
            profileName: encodedProfileName,
            formData: updateData
        },
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });
};
