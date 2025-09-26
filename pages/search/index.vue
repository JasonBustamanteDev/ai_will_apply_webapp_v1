<script setup lang="ts">
import { useFetchAllProfiles } from "~/shared/composables/useFetchAllProfiles";
import { formatMessageForExtension } from "~/ui/search/shared/message_utils";
import ExtensionNotInstalledModal from "~/ui/search/views/extensionNotInstalledModal.vue";

definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});

const env_config = useRuntimeConfig();
const supabaseProjectId = env_config.public.SUPABASE_PROJECT_ID;
const chromeExtensionId = env_config.public.CHROME_EXTENSION_ID;
const { profileList, fetchProfiles, showErrorToast } = useFetchAllProfiles();

const isMissingExtensionModalOpen = ref(false);

const sendAuthDataToExtension = () => {
    // If the chrome extension is not installed, open a modal which can direct users to the store page
    const isExtensionInstalled = document.documentElement.hasAttribute(
        "aiwillapply-extension-installed"
    );
    if (isExtensionInstalled === false) {
        isMissingExtensionModalOpen.value = true;
    }

    // If the chrome extension is installed, send a message to its service worker file
    const authObject = JSON.parse(
        localStorage.getItem(`sb-${supabaseProjectId}-auth-token`) || "{}"
    );
    const messagePayload = formatMessageForExtension(
        "SHARE_AUTH_DETAILS",
        authObject
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
            console.log(response);
        }
    );
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
</script>

<template>
    <div>
        <SharedNavbar />
        <div class="global-layout-container">
            <p class="pb-8">
                FUTURE CONTENT: All the supported platforms and prefilled
                filters
            </p>
            <p>{{ completedProfilesCount }}</p>
            <p>{{ completedProfileNames }}</p>
            <UButton @click="sendAuthDataToExtension"
                >FIRE MESSAGE TO EXT</UButton
            >
            <ExtensionNotInstalledModal
                v-model:isModalOpen="isMissingExtensionModalOpen"
            />
        </div>
    </div>
</template>
