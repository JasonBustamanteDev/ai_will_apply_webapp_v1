<script setup lang="ts">
import { useFetchAllProfiles } from "~/shared/composables/useFetchAllProfiles";
import { flattenFormData, formatMessageForExtension, recycleFormData } from "~/ui/search/shared/message_utils"; // prettier-ignore
import ExtensionNotInstalledModal from "~/ui/search/views/extensionNotInstalledModal.vue";
import { get } from "lodash";
import DownloadChromeModal from "~/ui/search/views/downloadChromeModal.vue";

definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});

const env_config = useRuntimeConfig();
const supabaseProjectId = env_config.public.SUPABASE_PROJECT_ID;
const chromeExtensionId = env_config.public.CHROME_EXTENSION_ID;
const { profileList, fetchProfiles, showErrorToast } = useFetchAllProfiles();

const isMissingExtensionModalOpen = ref(false);
const isNotOnChromeModalOpen = ref(false);
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

        // If the chrome extension is installed, send a message to its service worker file
        const authObject = JSON.parse(
            localStorage.getItem(`sb-${supabaseProjectId}-auth-token`) || "{}"
        );
        const coreFormData = flattenFormData(selectedProfileData as Object)
        const messagePayload = formatMessageForExtension(
            "SHARE_PROFILE_AND_AUTH_DATA",
            {
                currentProfile: {
                    name: selectedProfileName.value,
                    coreData: coreFormData,
                    expandedData: recycleFormData(coreFormData), // recycles key value pairs
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
                console.log(response)
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

const completedProfilesCount = computed(() =>
    profileList.value.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.isReady ? 1 : 0);
    }, 0)
);
const completedProfileNames = computed(() =>
    profileList.value.reduce((accumulator, currentItem) => {
        if (currentItem.isReady) accumulator.push(currentItem.profileName);
        return accumulator;
    }, [] as string[])
);

//! TODO: Not selecting a profile should render error visuals when you hit the button that sends a message
//! TODO If no profiles are present, render a button that redirects to the profile page (instead of showing the page. Or disable everything)
</script>

<template>
    <div>
        <SharedNavbar />
        <div class="global-layout-container">
            <p class="pb-8">
                FUTURE CONTENT: All the supported platforms and prefilled
                filters
            </p>
            <USelect
                v-model="selectedProfileName"
                :items="completedProfileNames"
                placeholder="Select profile"
                class="w-full"
            />
            <br class="mt-4" />
            <UButton @click="sendAuthDataToExtension"
                >FIRE MESSAGE TO EXT</UButton
            >
            <ExtensionNotInstalledModal
                v-model:isModalOpen="isMissingExtensionModalOpen"
            />
            <DownloadChromeModal v-model:isModalOpen="isNotOnChromeModalOpen" />
        </div>
    </div>
</template>
