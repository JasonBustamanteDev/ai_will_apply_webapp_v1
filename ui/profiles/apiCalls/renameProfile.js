import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers"; // prettier-ignore

export const renameProfile = async (
    supabaseProjectUrl,
    oldProfileName,
    newProfileName
) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);

    await $fetch(`/api/profiles/rename`, {
        method: "PATCH",
        body: {
            oldProfileName: encodeURI(oldProfileName),
            newProfileName: encodeURI(newProfileName),
        },
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });
};
