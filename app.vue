<script setup>
import { useSupabaseAuthStore } from "~/pinia_stores/supabase_auth";
import { useCustomToast } from "@/pinia_stores/toast";
// Everything you wrap around NuxtPage or place beside Nuxtpage will apply to each page you make
// This allows you to add global content

onMounted(async () => {
    // Initialize the supabase client by declaring the store when the app starts up
    useSupabaseAuthStore();
    useCustomToast();
});
</script>

<template>
    <UApp>
        <div class="pageBoundary content-shift-guard">
            <SharedFillerDiv />
            <NuxtPage />
            <SharedFillerDiv />
        </div>
        <ErrorPage
            class="mobile-view"
            errorCode=""
            title="Mobile not currently supported"
            message="Please view this website on desktop with a screen over 13 inches wide"
            :showButton="false"
        />
    </UApp>
</template>

<!--  prettier-ignore -->
<style>
@import "tailwindcss";
@import "@nuxt/ui";

/* Increase the tailwind font size classes */
.text-xs { font-size: 0.875rem !important; }    /* increased from 0.75rem */
.text-sm { font-size: 1rem !important; }        /* increased from 0.875rem */
.text-base { font-size: 1.125rem !important; }  /* increased from 1rem */
.text-lg { font-size: 1.25rem !important; }     /* increased from 1.125rem */
.text-xl { font-size: 1.375rem !important; }    /* increased from 1.25rem */
.text-2xl { font-size: 1.625rem !important; }   /* increased from 1.5rem */
.text-3xl { font-size: 2rem !important; }       /* increased from 1.875rem */
.text-4xl { font-size: 2.5rem !important; }     /* increased from 2.25rem */
.text-5xl { font-size: 3.25rem !important; }    /* increased from 3rem */
.text-6xl { font-size: 4rem !important; }       /* increased from 3.75rem */
.text-7xl { font-size: 5rem !important; }       /* increased from 4.5rem */
.text-8xl { font-size: 6.5rem !important; }     /* increased from 6rem */
.text-9xl { font-size: 8.5rem !important; }     /* increased from 8rem */
</style>

<style lang="scss">
@use "/assets/scss/main.scss" as main;

.global-layout-container {
    margin-top: main.$navbar-height;
    padding-inline: 10px;
    padding-top: 40px;
    padding-bottom: 80px;
}

* {
    font-family: var(
        --default-font-family,
        ui-sans-serif,
        system-ui,
        sans-serif,
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji"
    );
}

.content-shift-guard {
    overflow-x: hidden;
    padding-left: calc(100vw - 100%); // prevents content shifting due to y scrollbar
}
</style>

<style lang="scss" scoped>
@use "/assets/scss/main.scss" as main;

.pageBoundary {
    display: none; // hide content for small viewports since we do not support mobile
    height: 100%;
    min-height: 100vh;
    overflow-x: hidden;
    width: 100%;
    background-color: main.$light-theme-bg;
}
@media (min-width: main.$layout-small) {
    .pageBoundary {
        display: grid;
        grid-template-columns: 1fr 1000px 1fr; // CTRL F 1000px project wide
    }
    .mobile-view {
        display: none;
    }
}
</style>
