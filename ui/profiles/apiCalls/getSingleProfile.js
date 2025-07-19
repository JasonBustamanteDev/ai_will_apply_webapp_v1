import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers";
import { calculateProfileKpi } from "../shared/profileKpi";

export const getSingleProfile = async (
    supabaseProjectUrl,
    encodedDynamicProfileName
) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const result = await $fetch(
        `/api/profiles/read/${encodedDynamicProfileName}`,
        {
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        }
    );

    return await calculateProfileKpi(result.data);
};