<script setup lang="ts">
import { useFetchAllProfiles } from "~/shared/composables/useFetchAllProfiles";
import { flattenFormData, formatMessageForExtension, recycleFormData } from "~/ui/search/shared/message_utils"; // prettier-ignore
import LinkedinSearchFilters from "~/ui/search/views/searchFilters/linkedinSearchFilters.vue";
import { get } from "lodash";

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

const selectedProfileName = ref("");

const sendAuthDataToExtension = () => {
    try {
        // If the chrome extension is not installed, open a modal which can direct users to the store page
        const isExtensionInstalled = document.documentElement.hasAttribute(
            "aiwillapply-extension-installed"
        );
        if (isExtensionInstalled === false) {
            isMissingExtensionModalOpen.value = true;
            return;
        }

        const selectedProfileData = profileList.value.find((obj) => {
            return obj.profileName === selectedProfileName.value;
        });

        if (!selectedProfileData) return;

        // If the chrome extension is installed, send a message to its service worker file
        const authObject = JSON.parse(
            localStorage.getItem(`sb-${supabaseProjectId}-auth-token`) || "{}"
        );
        const coreFormData = flattenFormData(selectedProfileData);
        const messagePayload = formatMessageForExtension(
            "SHARE_PROFILE_AND_AUTH_DATA",
            {
                activeProfile: {
                    name: selectedProfileName.value,
                    data: {
                        core: coreFormData, // will show to AI
                        recycled: recycleFormData(coreFormData), // will use for 0(1) kvp matching
                    },
                },
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
        if (err.message === "chrome is not defined") {
            // console.error(err.message);
            isNotOnChromeModalOpen.value = true;
        }
        console.error(err);
        showErrorToast(
            "ERROR: STARTING JOB SEARCH",
            err?.message || "Request to start job search failed.",
            true
        );
    }
};

onMounted(async () => {
    await fetchProfiles();
});

const completedProfileNames = computed(() =>
    profileList.value.reduce((accumulator, currentItem) => {
        if (currentItem.isReady) accumulator.push(currentItem.profileName);
        return accumulator;
    }, [] as string[])
);

//! TODO: Not selecting a profile should render error visuals when you hit the button that sends a message
//! TODO If no profiles are present, render some error text and an anchor, plus disable the fire button and form
</script>

<template>
    <div>
        <SharedNavbar />
        <div class="global-layout-container">
            <LinkedinSearchFilters>
                <UFormField label="Applicant Profile">
                    <USelect
                        v-model="selectedProfileName"
                        :items="completedProfileNames"
                        placeholder="Select profile"
                        class="w-full"
                    />
                </UFormField>
            </LinkedinSearchFilters>

            <UButton
                @click="sendAuthDataToExtension"
                color="secondary"
                trailingIcon="heroicons:rocket-launch-16-solid"
                class="mt-4"
                >Auto apply to jobs on LinkedIn</UButton
            >

            <!-- Extension not installed Modal -->
            <SharedPictureModal
                v-model:isModalOpen="isNotOnChromeModalOpen"
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
                title="Create at least 1 Applicant Profile to start your job hunt"
                description="Once you successfully create an Applicant Profile, try this 'Job Search' feature again"
                anchorText="Click here to create a job profile"
                :redirectUrl="profilesUrl"
                pathToImage="/images/misc/applicant_profiles.png"
            />
        </div>
    </div>
</template>
