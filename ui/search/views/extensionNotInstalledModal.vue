<script setup>
const isModalOpen = ref(true);
</script>

<template>
    <UModal
        v-model:open="isModalOpen"
        title="Install our 'AI will Apply' extension first"
        description=""
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <p class="mb-1">Once you install the extension, reload this page and try again</p>
            <a href="" class="text-blue-500">Click here to visit the Google Chrome store page</a>
            <NuxtImg src="/images/misc/loom_extension.png" class="w-200px mt-4" />
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
