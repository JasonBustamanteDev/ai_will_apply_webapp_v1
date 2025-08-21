import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers";
import { calculateProfileKpi } from "../shared/profileKpi";

export const getProfiles = async (supabaseProjectUrl: string) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const result = await $fetch("/api/profiles/read/all", {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    const resultData = result.data as JobSearchProfilesRow[];
    return await formatData(resultData);
};

const formatData = async (profileList: JobSearchProfilesRow[]) => {
    const rowPromises = profileList.map(calculateProfileKpi);
    return await Promise.all(rowPromises);
};
