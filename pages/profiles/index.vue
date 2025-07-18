<script setup>
import AddProfileSvg from "~/ui/svgs/addProfile.vue";
import ProfileCard from "~/ui/profiles/shared/profileCard.vue";
import { getProfiles } from "~/ui/profiles/apiCalls/getProfiles.js";
import { deleteProfile } from "~/ui/profiles/apiCalls/deleteProfile";
import { renameProfile } from "~/ui/profiles/apiCalls/renameProfile";
import { useCustomToast } from "~/pinia_stores/toast";

const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const profileList = ref([]);
const { showErrorToast } = useCustomToast();

const fetchProfiles = async () => {
    try {
        profileList.value = await getProfiles(supabaseProjectURL);
    } catch (err) {
        showErrorToast(
            err.message || "Request to get profiles failed.",
            "ERROR: FETCHING PROFILES"
        );
    }
};

onMounted(async () => {
    await fetchProfiles();
});

const createNewProfileHandler = async () => {
    try {
        //! HOOK UP
    } catch (err) {
        showErrorToast(
            err.message || "Request to create a profile failed.",
            "ERROR: INITIALIZING PROFILE"
        );
    }
};
const editProfileHandler = async () => {
    try {
        //! HOOK UP
    } catch (err) {
        showErrorToast(
            err.message || "Request to update profile failed.",
            "ERROR: EDIT PROFILE"
        );
    }
};

const deleteProfileHandler = async (profileName) => {
    try {
        await deleteProfile(supabaseProjectURL, profileName);
        await fetchProfiles(); // refetch
    } catch (err) {
        showErrorToast(
            err.message || "Request to delete profile failed.",
            "ERROR: DELETE PROFILE"
        );
    }
};

const renameProfileHandler = async (oldProfileName, newProfileName) => {
    try {
        await renameProfile(supabaseProjectURL, oldProfileName, newProfileName);
        await fetchProfiles(); // refetch
    } catch (err) {
        console.error(err);
        showErrorToast(
            err.message || "Request to rename profile failed.",
            "ERROR: RENAME PROFILE"
        );
    }
};
</script>

<template>
    <!-- DaisyUI components used for the cards -->
    <SharedPageContainerWithNavbar>
        <section class="card-container">
            <div
                @click="createNewProfile"
                class="cursor-pointer card bg-base-100 w-full shadow-sm"
            >
                <div class="create-new-card text-center">
                    <div class="w-[40px] mx-auto mb-3">
                        <AddProfileSvg />
                    </div>
                    <h2 class="card-title text-lg">Create New Profile</h2>
                    <p class="text-sm">
                        Enter your information then use the profile when
                        applying for jobs
                    </p>
                </div>
            </div>

            <ProfileCard
                v-for="(entry, index) in profileList"
                :key="index"
                :profileName="entry.profileName"
                :lastModifiedDate="entry.lastUpdated"
                :isReady="entry.isReady"
                :completionFraction="entry.completedFormFraction"
                @editCallback="editProfile"
                @deleteProfile="deleteProfileHandler"
                @renameProfile="renameProfileHandler"
            />
        </section>
        <ErrorToast description="Generic problem" />
    </SharedPageContainerWithNavbar>
</template>

<style lang="scss">
.create-new-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    height: 100%;
    padding: 24px;
}
.card-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: repeat(2, 240px);
    gap: 1rem;
}
</style>
