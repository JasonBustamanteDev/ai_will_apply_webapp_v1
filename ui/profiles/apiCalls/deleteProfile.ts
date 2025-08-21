import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers"; // prettier-ignore

export const deleteProfile = async (
    supabaseProjectUrl: string,
    profileName: string
) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const encodedProfileName = encodeURI(profileName);
    await $fetch(`/api/profiles/remove/${encodedProfileName}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });
};
