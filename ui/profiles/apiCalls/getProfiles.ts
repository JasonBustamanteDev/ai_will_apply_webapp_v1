import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers";
import { calculateProfileKpi } from "../constants/profileKpi";

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

export type ProfileListType = Awaited<ReturnType<typeof getProfiles>>;
export type SingleProfileType = ProfileListType[number];