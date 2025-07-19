import { getAuthSessionFromLocalStorage } from "~/shared/client_helpers";
import { calculateProfileKpi } from "../shared/profileKpi";

export const getProfiles = async (supabaseProjectUrl) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const result = await $fetch("/api/profiles/read/all", {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    return await formatData(result.data);
};

const formatData = async (profileList) => {
    const rowPromises = profileList.map(calculateProfileKpi);
    return await Promise.all(rowPromises);
};
