import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers";

export const getProfiles = async (supabaseProjectUrl) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const result = await $fetch("/api/profiles/readAll", {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });
    return result.data;
};
