import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers"; // prettier-ignore

export const renameProfile = async (
    supabaseProjectUrl: string,
    oldProfileName: string,
    newProfileName: string
) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const oldName = encodeURI(oldProfileName);
    const newName = encodeURI(newProfileName);

    if (oldName === newName) return;

    await $fetch(`/api/profiles/rename`, {
        method: "PATCH",
        body: {
            oldProfileName: oldName,
            newProfileName: newName,
        },
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });
};
