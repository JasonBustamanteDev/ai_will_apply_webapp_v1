<script setup lang="ts">
const items = [
    [
        {
            label: "Job Search",
            icon: "i-lucide-book-open",
            to: "/getting-started",
        },
        {
            label: "Applicant Profiles",
            icon: "i-lucide-database",
            to: "/composables",
        },
        {
            label: "Pricing",
            icon: "i-lucide-box",
            to: "/components",
            active: true,
        },
    ],
    [
        {
            label: "My Account",
            icon: "i-simple-icons-github",
            // badge: "3.8k",
            // to: "https://github.com/nuxt/ui",
            // target: "_blank",
            children: [
                {
                    label: "Sign out",
                    icon: "i-lucide-file-text",
                    description: "",
                    to: "/components/link",
                },
            ],
        },
    ],
];
</script>

<template>
    <UNavigationMenu
        color="neutral"
        variant="link"
        :items="items"
        class="nuxtui-navbar"
        :highlight="true"
        contentOrientation="vertical"
    />
</template>

<style lang="scss" scoped>
.nuxtui-navbar {
    width: 100%;
}
</style>
