import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers"; // prettier-ignore

export const initializeProfile = async (supabaseProjectUrl, newProfileName) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const newName = encodeURI(newProfileName);

    await $fetch(`/api/profiles/initialize`, {
        method: "POST",
        body: { newProfileName: newName },
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });
};
