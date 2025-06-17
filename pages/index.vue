<script setup>
import { PAGE_URLS } from "~/shared/globals";
import { useSupabaseAuthStore } from "~/pinia_stores/supabase_auth";

// definePageMeta({
//     middleware: defineNuxtRouteMiddleware((to, from) => {
//         const auth_cookie = useCookie("awa_auth");
//         return navigateTo(
//             auth_cookie.value ? PAGE_URLS.DASHBOARD : PAGE_URLS.LOGIN
//         );
//     }),
// });
</script>

<template>
    <div></div>
</template>

<style lang="scss"></style>
