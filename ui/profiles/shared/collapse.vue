<script setup lang="ts">
const props = defineProps({
    isComplete: { type: Boolean },
    isOptional: { type: Boolean, default: false },
    title: { type: String },
    checkboxId: { type: String },
});

// STRANGE BEHAVIOR:
// We use daisyUI classes to style the collapse component
// Hot module reloading straight up does not work on the profiles page when we do
// Must manually reload on /profiles when you make dev changes
// if you hit blue reload button when page crashes, HMR works well again afterwards
</script>

<template>
    <div class="collapse collapse-arrow bg-base-100 border-base-300 border">
        <input :id="props.checkboxId" type="checkbox" name="collapse-component" />
        <div class="collapse-title font-semibold">
            <span class="mr-8">{{ props.title }}</span>
            <UBadge v-if="props.isComplete" label="complete" />
            <UBadge
                v-else-if="!props.isComplete && props.isOptional"
                label="optional + incomplete"
                class="custom-badge"
            />
            <UBadge v-else label="incomplete" color="error" />
        </div>

        <div class="collapse-content text-sm">
            <slot></slot>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.custom-badge {
    --badge-bg: #ff6b35;
    --badge-text: #ffffff;
    background-color: var(--badge-bg) !important;
    color: var(--badge-text) !important;
}
</style>
