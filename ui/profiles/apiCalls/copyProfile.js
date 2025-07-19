import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers"; // prettier-ignore

export const copyProfile = async (
    supabaseProjectUrl,
    newProfileName,
    existingData = null
) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const newName = encodeURI(newProfileName);

    await $fetch(`/api/profiles/initialize`, {
        method: "POST",
        body: { newProfileName: newName, existingData },
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });
};
