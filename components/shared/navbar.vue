<script setup lang="ts">
const items = [
    [
        {
            label: "Job Search",
            icon: "garden:search-fill-12",
            to: "/getting-started",
        },
        {
            label: "Applicant Profiles",
            icon: "majesticons:user-group",
            icon: "mage:user-circle-fill",
            to: "/composables",
        },
        {
            label: "Pricing",
            icon: "material-symbols:personalized-recommendations",
            to: "/components",
            active: true,
        },
    ],
    [
        {
            label: "My Account",
            icon: "famicons:person",
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
        :ui="{
            linkLabel: 'px-1',
        }"
    />
</template>

<style lang="scss" scoped>
.nuxtui-navbar {
    width: 100%;
}
</style>
