<script setup>
const props = defineProps({
    bgColor: { type: String, required: true },
});
</script>

<template>
    <svg
        class="w-8 h-8"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <circle cx="12" cy="6" r="2" fill="#2557A7" />
        <rect x="10" y="10" width="4" height="10" rx="1" fill="#2557A7" />
    </svg>
</template>

<style lang="scss"></style>
