<script setup>
const env_config = useRuntimeConfig();
const chromeExtensionURL = env_config.public.CHROME_STORE_URL;

const props = defineProps({
    isModalOpen: { type: Boolean },
});

const emit = defineEmits(['update:isModalOpen']);

const isOpen = computed({
    get: () => props.isModalOpen,
    set: (value) => emit('update:isModalOpen', value)
});
</script>

<template>
    <UModal
        v-model:open="isOpen"
        title="Create at least 1 Applicant Profile to start your job hunt"
        description=""
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <p class="mb-1">
                Once you successfully create an Applicant Profile, try this "Job Search" feature again
            </p>
            <a :href="chromeExtensionURL" target="_blank" rel="noopener noreferrer" class="text-blue-500"
                >Click here to create a job profile</a
            >
            <NuxtImg
                src="/images/misc/applicant_profiles.png"
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
