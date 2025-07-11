<script setup>
const props = defineProps({
    isDisabled: {
        type: Boolean,
        default: true,
    },
});
</script>

<template>
    <UButton
        icon="i-heroicons-minus"
        variant="outline"
        color="neutral"
        :disabled="props.isDisabled"
        @click="$emit('removeRow')"
        class="w-72"
    >
        <slot></slot>
    </UButton>
</template>

<style lang="scss"></style>
