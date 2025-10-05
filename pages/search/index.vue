<script setup lang="ts">
import { useFetchAllProfiles } from "~/shared/composables/useFetchAllProfiles";
import { flattenFormData, formatMessageForExtension, recycleFormData } from "~/ui/search/constants/message_utils"; // prettier-ignore
import LinkedinSearchFilters from "~/ui/search/views/searchFilters/linkedinSearchFilters.vue";
import IndeedSearchFilters from "~/ui/search/views/searchFilters/indeedSearchFilters.vue";
import { get } from "lodash";
import type { LinkedInSearchPayload } from "~/ui/search/constants/filterOptions/linkedinFilters"; // prettier-ignore
import type { IndeedSearchPayload } from "~/ui/search/constants/filterOptions/indeedFilters"; // prettier-ignore

definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});

const env_config = useRuntimeConfig();
const supabaseProjectId = env_config.public.SUPABASE_PROJECT_ID;
const chromeExtensionId = env_config.public.CHROME_EXTENSION_ID;
const chromeExtensionURL = env_config.public.CHROME_STORE_URL;
const profilesUrl = `${env_config.public.BASE_URL}/profiles`;

const { profileList, fetchProfiles, showErrorToast } = useFetchAllProfiles();

const isMissingExtensionModalOpen = ref(false);
const isNotOnChromeModalOpen = ref(false);
const isNoProfilesModalOpen = ref(false);

onMounted(async () => {
    await fetchProfiles();
});

const completedProfileNames = computed(() =>
    profileList.value.reduce((accumulator, currentItem) => {
        if (currentItem.isReady) accumulator.push(currentItem.profileName);
        return accumulator;
    }, [] as string[])
);

watch(completedProfileNames, async (newList) => {
    // If we have no completed profiles, render an error modal
    if (newList.length < 1) isNoProfilesModalOpen.value = true;
});

const sendMessageToExtension = (
    selectedProfileName: string,
    job_board_filters: any
) => {
    try {
        // If the chrome extension is not installed, open a modal which can direct users to the store page
        const isExtensionInstalled = document.documentElement.hasAttribute(
            "aiwillapply-extension-installed"
        );
        if (!isExtensionInstalled) {
            isMissingExtensionModalOpen.value = true;
            return;
        }

        // Check to see if the profile data is present
        const selectedProfileData = profileList.value.find((obj) => {
            return obj.profileName === selectedProfileName;
        });
        if (!selectedProfileData) return;

        // If the chrome extension is installed, send a message to its service worker file
        const authObject = JSON.parse(
            localStorage.getItem(`sb-${supabaseProjectId}-auth-token`) || "{}"
        );
        const coreFormData = flattenFormData(selectedProfileData);
        const messagePayload = formatMessageForExtension(
            "INITIALIZE_JOB_HUNT_SESSION",
            {
                activeProfile: {
                    name: selectedProfileName,
                    data: {
                        core: coreFormData, // will show to AI
                        recycled: recycleFormData(coreFormData), // will use for O(1) kvp matching
                    },
                },
                searchFilters: job_board_filters,
                auth: {
                    id: get(authObject, ["user", "id"], null),
                    accessToken: `Bearer ${get(
                        authObject,
                        ["access_token"],
                        ""
                    )}`,
                    expiryUnixTimestamp: get(authObject, ["expires_at"], null),
                },
            }
        );

        // @ts-expect-error
        chrome.runtime.sendMessage(
            chromeExtensionId,
            messagePayload,
            // @ts-expect-error
            (response) => {
                // @ts-expect-error
                if (chrome.runtime.lastError) {
                    console.log("Extension not available");
                }
            }
        );
    } catch (err: any) {
        // If using the web app on a different browser than chrome, render an error modal
        if (err.message === "chrome is not defined") {
            // console.error(err.message);
            isNotOnChromeModalOpen.value = true;
            return;
        }

        console.error(err);
        showErrorToast(
            "ERROR: STARTING JOB SEARCH",
            err?.message || "Request to start job search failed.",
            true
        );
    }
};

const handleLinkedInSearch = (linkedin_filters: LinkedInSearchPayload) => {
    sendMessageToExtension(linkedin_filters.profileName, linkedin_filters);
};

const handleIndeedSearch = (indeed_filters: IndeedSearchPayload) => {
    sendMessageToExtension(indeed_filters.profileName, indeed_filters);
};
</script>

<template>
    <div>
        <SharedNavbar />
        <div class="global-layout-container">
            <LinkedinSearchFilters
                @fire_up_linkedin_search="handleLinkedInSearch"
                :profileList="completedProfileNames"
            />
            <IndeedSearchFilters
                @fire_up_indeed_search="handleIndeedSearch"
                :profileList="completedProfileNames"
            />

            <!-- Extension not installed Modal -->
            <SharedPictureModal
                v-model:isModalOpen="isMissingExtensionModalOpen"
                title="Install our 'AI will Apply' extension first"
                description="Once you install the extension, reload this page and try again"
                anchorText="Click here to visit our Google Chrome store page"
                :redirectUrl="chromeExtensionURL"
                pathToImage="/images/misc/loom_extension.png"
            />

            <!-- Download Chrome Modal -->
            <SharedPictureModal
                v-model:isModalOpen="isNotOnChromeModalOpen"
                title="This product only works on Google Chrome"
                description="Once you install the Google Chrome, visit this website again on that browser"
                anchorText="Click here to download chrome"
                redirectUrl="https://www.google.com/chrome/"
                pathToImage="/images/misc/chrome_browser.png"
            />

            <!-- No Profiles Found Modal -->
            <SharedPictureModal
                v-model:isModalOpen="isNoProfilesModalOpen"
                title="Make at least 1 Applicant Profile to start your job hunt"
                description="Once you successfully create an Applicant Profile, try this 'Job Search' feature again."
                anchorText="Click here to create a job profile"
                :redirectUrl="profilesUrl"
                pathToImage="/images/misc/applicant_profiles.png"
            />
        </div>
    </div>
</template>
