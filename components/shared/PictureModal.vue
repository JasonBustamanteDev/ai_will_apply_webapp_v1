<script setup>
const props = defineProps({
    isModalOpen: { type: Boolean },
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

const visitUrlInNewWindow = () => {
    window.open(props.redirectUrl, "_blank");
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
                :href="props.redirectUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-blue-500"
                >{{ props.anchorText }}</a
            >
            <NuxtImg
                :src="props.pathToImage"
                class="w-200px mt-4 cursor-pointer"
                @click="visitUrlInNewWindow"
            />
        </template>

        <template #footer="{ close }">
            <UButton
                label="Exit"
                color="neutral"
                variant="outline"
                class="cursor-pointer"
                @click="close"
            />
        </template>
    </UModal>
</template>

<style lang="scss"></style>
