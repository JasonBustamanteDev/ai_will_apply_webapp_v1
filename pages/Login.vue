<script setup>
definePageMeta({
    // Redirect to /dashboard session exists in Local Storage
    middleware: ["redirect-if-auth-session-exists-client"],
});
</script>

<template>
    <div>Login Form goes here. Support email/pass as well</div>
</template>

<style lang="scss"></style>
