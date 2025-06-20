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
            <!-- <div class="pageContainer"> -->
                <!-- <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div>
                <div style="height: 200px; "></div> -->
                <NuxtPage />
            <!-- </div> -->
        </div>
    </UApp>
</template>

<style>
@import "tailwindcss";
@import "@nuxt/ui";
</style>

<style lang="scss" scoped>
.pageBoundary {
    min-height: 100vh;
    height: 100%;
    background: #F5DEB3;
}
@media (min-width: 20rem) {
}

@media (min-width: 40rem) {
    
}
</style>
