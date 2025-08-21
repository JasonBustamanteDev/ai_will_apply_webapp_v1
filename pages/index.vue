<script setup lang="ts">
definePageMeta({
    middleware: [
        function () {
            return navigateTo(PAGE_URLS.SEARCH);
        },
    ],
});
</script>

<template>
    <div></div>
</template>
