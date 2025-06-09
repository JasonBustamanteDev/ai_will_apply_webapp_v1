<script setup>
import { useCompositionAuthStore } from "@/pinia_stores/auth2";
// Everything you wrap around NuxtPage or place beside Nuxtpage will apply to each page you make
// This allows you to add global content

// Look this up: https://ui.nuxt.com/components/input#within-a-formfield

onMounted(async () => {
    // Initialize the supabase client
    const authStore = useCompositionAuthStore();
    await authStore.methods.initializeSupabaseClient();
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
