<script setup>
import { useSupabaseAuthStore } from "~/pinia_stores/supabase_auth";

definePageMeta({
    middleware: [
        async function () {
            const authStore = useSupabaseAuthStore();
            await authStore.methods.googleSignOut();
            return navigateTo(PAGE_URLS.LOGIN);
        },
    ],
});
</script>

<template></template>
