<script setup>
import { AUTH_STRINGS } from "~/shared/globals";
import { useSupabaseAuthStore } from "~/pinia_stores/supabase_auth";

definePageMeta({
    middleware: defineNuxtRouteMiddleware((to, from) => {
        const auth_cookie = useCookie(AUTH_STRINGS.AUTH_COOKIE_NAME);
        return navigateTo(
            auth_cookie.value ? PAGE_URLS.DASHBOARD : PAGE_URLS.LOGIN
        );
    }),
});
</script>

<template>
    <div></div>
</template>

<style lang="scss"></style>
