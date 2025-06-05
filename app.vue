<script setup>
// Everything you wrap around NuxtPage or place beside Nuxtpage will apply to each page you make
// This allows you to add global content

// Look this up: https://ui.nuxt.com/components/input#within-a-formfield
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
