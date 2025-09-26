import { useCustomToast } from "~/pinia_stores/toast";
import { getProfiles } from "~/ui/profiles/apiCalls/getProfiles.js";
import type { ProfileListType } from "~/ui/profiles/apiCalls/getProfiles";

export function useFetchAllProfiles() {
    const env_config = useRuntimeConfig();
    const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

    const profileList: Ref<ProfileListType> = ref([]);
    const { showErrorToast } = useCustomToast();

    const fetchProfiles = async () => {
        try {
            profileList.value = await getProfiles(supabaseProjectURL);
            console.log(profileList.value);
        } catch (err: any) {
            console.error(err);
            showErrorToast(
                "ERROR: FETCHING PROFILES",
                err?.data?.detail ||
                    err?.message ||
                    "Request to get profiles failed.",
                true
            );
        }
    };

    return { profileList, fetchProfiles };
}
