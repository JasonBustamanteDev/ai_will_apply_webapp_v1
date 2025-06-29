<script setup>
definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});
</script>

<template>
    <div>
        <SharedNavbar />
        <p class="pt-6">FUTURE CONTENT: Select a profile then edit each profile's data (used for job searching)</p>
    </div>
</template>
