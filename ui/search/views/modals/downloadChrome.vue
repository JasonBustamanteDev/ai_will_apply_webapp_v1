<script setup>
const props = defineProps({
    isModalOpen: { type: Boolean },
});

const emit = defineEmits(['update:isModalOpen']);

const isOpen = computed({
    get: () => props.isModalOpen,
    set: (value) => emit('update:isModalOpen', value)
});

const downloadChromeUrl = 'https://www.google.com/chrome/'
</script>

<template>
    <UModal
        v-model:open="isOpen"
        title="This product only works on Google Chrome"
        description=""
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <p class="mb-1">
                Once you install the Google Chrome, visit this website again on that browser
            </p>
            <a :href="downloadChromeUrl" target="_blank" rel="noopener noreferrer" class="text-blue-500"
                >Click here to download chrome</a
            >
            <NuxtImg
                src="/images/misc/chrome_browser.png"
                class="w-200px mt-4"
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
