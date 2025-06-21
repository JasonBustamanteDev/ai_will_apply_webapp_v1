<script setup>
definePageMeta({
    middleware: [
        function () {
            return navigateTo("/dashboard");
        },
    ],
});
</script>

<template>
    <div></div>
</template>

<style lang="scss"></style>
