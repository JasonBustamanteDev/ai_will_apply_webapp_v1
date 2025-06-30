<script setup>
const items = [
    [
        {
            label: "Job Search",
            icon: "garden:search-fill-12",
            to: "/search",
        },
        {
            label: "Applicant Profiles",
            icon: "mage:user-circle-fill",
            to: "/profiles",
        },
        {
            label: "Guide",
            icon: "ic:round-school",
            to: "/guide",
        },
        {
            label: "Pricing",
            icon: "material-symbols:personalized-recommendations",
            to: "/pricing",
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
                    icon: "si:sign-out-alt-fill",
                    description: "",
                    to: "/signout", // signs out using middleware
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
