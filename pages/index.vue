<script setup>
import { PAGE_URLS } from "~/shared/globals";
import { useSupabaseAuthStore } from "~/pinia_stores/supabase_auth";

definePageMeta({
    middleware: defineNuxtRouteMiddleware((to, from) => {
        const authStore = useSupabaseAuthStore();
        return navigateTo(
            authStore.computed.isAuthenticated
                ? PAGE_URLS.DASHBOARD
                : PAGE_URLS.LOGIN
        );
    }),
});
</script>

<template>
    <div></div>
</template>

<style lang="scss"></style>
