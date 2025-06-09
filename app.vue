<script setup>
import { useSupabaseAuthStore } from "~/pinia_stores/auth";
// Everything you wrap around NuxtPage or place beside Nuxtpage will apply to each page you make
// This allows you to add global content

onMounted(async () => {
    // Initialize the supabase client by declaring the store when the app starts up
    useSupabaseAuthStore();
});
</script>

<template>
    <UApp>
        <div>
            <p>This message always appears atop each pages</p>
            <NuxtPage />
        </div>
    </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>
