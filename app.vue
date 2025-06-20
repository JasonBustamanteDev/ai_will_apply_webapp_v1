<script setup>
import { useSupabaseAuthStore } from "~/pinia_stores/supabase_auth";
// Everything you wrap around NuxtPage or place beside Nuxtpage will apply to each page you make
// This allows you to add global content

onMounted(async () => {
    // Initialize the supabase client by declaring the store when the app starts up
    useSupabaseAuthStore();
});
</script>

<template>
    <UApp>
        <div class="pageBoundary">
            <div class="fillerDiv"></div>
            <NuxtPage />
            <div class="fillerDiv"></div>
        </div>
    </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>

<style lang="scss" scoped>
$layout-small: 1250px;

.pageBoundary {
    display: none; // hide content for small viewprts since we do not support mobile
    height: 100%;
    min-height: 100vh;
    overflow-x: hidden;
}
@media (min-width: $layout-small) {
    .pageBoundary {
        display: grid;
        grid-template-columns: 1fr 1200px 1fr;
        width: 100%;
    }
}
</style>
