<script setup lang="ts">
import ExtensionNotInstalledModal from "~/ui/search/views/extensionNotInstalledModal.vue";
definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});

const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const isMissingExtensionModalOpen = ref(false);

const sendAuthDataToExtension = () => {
    const isExtensionInstalled = document.documentElement.hasAttribute(
        "aiwillapply-extension-installed"
    );
    if (isExtensionInstalled === false) {
        isMissingExtensionModalOpen.value = true;
    }


    // DO NOT DO THIS (SECURITY RISK)
    // DO NOT DO THIS (SECURITY RISK)
    // DO NOT DO THIS (SECURITY RISK)
    // DO NOT DO THIS (SECURITY RISK)
    // DO NOT DO THIS (SECURITY RISK)
    // // Send a message to your extension - it should have a content script running on your own site
    // const supabasePublic = "jgvuigssexmkwtoqfvbt";
    // const authObject =
    //     localStorage.getItem(`sb-${supabasePublic}-auth-token`) || "{}";

    // window.postMessage(
    //     {
    //         type: "EXTENSION_AUTH_INIT",
    //         payload: JSON.parse(authObject), //! security risk - any malicious extension can see this
    //     },
    //     "*" // The * here just means "send to same page"
    // );
};
</script>

<template>
    <div>
        <SharedNavbar />
        <div class="global-layout-container">
            <p class="pb-8">
                FUTURE CONTENT: All the supported platforms and prefilled
                filters
            </p>
            <UButton @click="sendAuthDataToExtension"
                >FIRE MESSAGE TO EXT</UButton
            >
            <ExtensionNotInstalledModal v-model:isModalOpen="isMissingExtensionModalOpen" />
        </div>
    </div>
</template>
