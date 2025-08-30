import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers";
import { calculateProfileKpi } from "../shared/profileKpi";

export const getSingleProfile = async (
    supabaseProjectUrl: string,
    encodedDynamicProfileName: string
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

    return await calculateProfileKpi(result.data as JobSearchProfilesRow);
};

export type SingleProfileType = Awaited<ReturnType<typeof getSingleProfile>>;