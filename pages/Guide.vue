<script setup lang="ts">
definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});
</script>

<template>
    <div>
        <SharedNavbar />
        <div class="global-layout-container">
            <p class="pt-6">
                FUTURE CONTENT: Offer text and video guides for how to use the
                product. Ensure you test this for partially filled profiles on
                each platform. Make it real easy
            </p>
        </div>
    </div>
</template>
