<script setup>
definePageMeta({
    // Redirect to /login if no session exists in Local Storage
    middleware: ["redirect-if-no-auth-session-client"],
});
</script>

<template>
    <div>
        <SharedNavbar />
    </div>
</template>
