<script setup>
const props = defineProps({
    homeRoute: {
        type: String,
        default: "/",
    },
    isDisabled: {
        type: Boolean,
        default: true,
    },
});
</script>

<template>
    <UButton
        icon="i-heroicons-plus"
        variant="outline"
        color="neutral"
        :disabled="props.isDisabled"
        @click="$emit('addRow')"
        class="w-48"
    >
        <slot></slot>
    </UButton>
</template>

<style lang="scss"></style>
