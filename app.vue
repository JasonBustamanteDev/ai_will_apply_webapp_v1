<script setup>
import { useAuthStore } from "@/pinia_stores/auth";
// Everything you wrap around NuxtPage or place beside Nuxtpage will apply to each page you make
// This allows you to add global content

// Look this up: https://ui.nuxt.com/components/input#within-a-formfield

onMounted(async () => {
    // Initialize the supabase client
    const authStore = useAuthStore();
    await authStore.initializeSupabaseClient();
    console.log(authStore.userData);
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
