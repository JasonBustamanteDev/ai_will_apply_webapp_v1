<script setup>
import ProfileListItemCard from "~/ui/profiles/shared/profile-dashboard/profileListItemCard.vue";
import InitializeProfileCard from "~/ui/profiles/shared/profile-dashboard/initializeProfileCard.vue";
import { useCustomToast } from "~/pinia_stores/toast";
import { getProfiles } from "~/ui/profiles/apiCalls/getProfiles.js";
import { deleteProfile } from "~/ui/profiles/apiCalls/deleteProfile";
import { renameProfile } from "~/ui/profiles/apiCalls/renameProfile";
import { initializeProfile } from "~/ui/profiles/apiCalls/initializeProfile";

definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});

const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const profileList = ref([]);
const { showErrorToast } = useCustomToast();

const fetchProfiles = async () => {
    try {
        profileList.value = await getProfiles(supabaseProjectURL);
    } catch (err) {
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

onMounted(async () => {
    await fetchProfiles();
});

const initializeProfileHandler = async (newProfileName) => {
    try {
        await initializeProfile(supabaseProjectURL, newProfileName); //! init_instance1
        await fetchProfiles(); // refetch
    } catch (err) {
        showErrorToast(
            "ERROR: INITIALIZING PROFILE",
            err?.data?.detail ||
                err?.message ||
                `Request to create a profile failed. ${ERROR_MESSAGES.RELOAD}`,
            false
        );
    }
};
const editProfileHandler = async (profileName) => {
    await navigateTo({
        path: PAGE_URLS.PROFILE_DATA,
        query: {
            profileName: encodeURI(profileName),
        },
    });
};

const deleteProfileHandler = async (profileName) => {
    try {
        await deleteProfile(supabaseProjectURL, profileName);
        await fetchProfiles(); // refetch
    } catch (err) {
        showErrorToast(
            "ERROR: DELETE PROFILE",
            err?.data?.detail ||
                err?.message ||
                "Request to delete profile failed.",
            true
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
            "ERROR: RENAME PROFILE",
            err?.data?.detail ||
                err?.message ||
                "Request to rename profile failed.",
            true
        );
    }
};

const copyProfileHandler = async (newProfileName, existingData = null) => {
    try {
        await initializeProfile(
            supabaseProjectURL,
            newProfileName,
            existingData //! init_instance2
        );
        await fetchProfiles(); // refetch
    } catch (err) {
        showErrorToast(
            "ERROR: COPY PROFILE",
            err?.data?.detail ||
                err?.message ||
                `Request to create a copy failed. ${ERROR_MESSAGES.RELOAD}`,
            false
        );
    }
};
</script>

<template>
    <!-- DaisyUI components used for the cards -->
    <SharedPageContainerWithNavbar>
        <section class="card-container">
            <InitializeProfileCard
                @initializeProfile="initializeProfileHandler"
            />

            <ProfileListItemCard
                v-for="(entry, index) in profileList"
                :key="index"
                :profileName="entry.profileName"
                :lastModifiedDate="entry.lastUpdated"
                :isReady="entry.isReady"
                :completionFraction="entry.completedFormFraction"
                :rowData="entry.forms"
                @editCallback="editProfileHandler"
                @deleteProfile="deleteProfileHandler"
                @renameProfile="renameProfileHandler"
                @copyProfile="copyProfileHandler"
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
