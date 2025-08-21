import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers"; // prettier-ignore

export const updateProfile = async (
    supabaseProjectUrl: string,
    encodedProfileName: string,
    updateData: any
) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);

    await $fetch(`/api/profiles/update`, {
        method: "PATCH",
        body: {
            profileName: encodedProfileName,
            formData: updateData,
        },
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });
};
