<script setup>
definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});
</script>

<template>
    <div>
        <SharedNavbar />
        <p class="pt-6">FUTURE CONTENT: All the supported platforms and prefilled filters</p>
    </div>
</template>
