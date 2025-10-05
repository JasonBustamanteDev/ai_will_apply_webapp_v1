<script setup>
const props = defineProps({
    isModalOpen: { type: Boolean, required: true },
    openUrlInNewTab: { type: Boolean, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    redirectUrl: { type: String, required: true },
    anchorText: { type: String, required: true },
    pathToImage: { type: String, required: true },
});

const emit = defineEmits(["update:isModalOpen"]);

const isOpen = computed({
    get: () => props.isModalOpen,
    set: (value) => emit("update:isModalOpen", value),
});

const visitUrl = () => {
    if (props.openUrlInNewTab) window.open(props.redirectUrl, "_blank");
    else window.location.href = props.redirectUrl;
};
</script>

<template>
    <UModal
        v-model:open="isOpen"
        :title="props.title"
        description=""
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <p class="mb-1">{{ props.description }}</p>
            <a
                @click="visitUrl"
                rel="noopener noreferrer"
                class="text-blue-500 cursor-pointer"
                >{{ props.anchorText }}</a
            >
            <NuxtImg
                :src="props.pathToImage"
                class="w-200px mt-4 cursor-pointer"
                @click="visitUrl"
            />
        </template>

        <template #footer="{ close }">
            <UButton
                label="Close"
                color="neutral"
                variant="outline"
                class="cursor-pointer"
                @click="close"
            />
        </template>
    </UModal>
</template>

<style lang="scss"></style>
