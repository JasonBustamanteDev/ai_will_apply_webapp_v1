<script setup>
const props = defineProps({
    profileName: { type: String },
    lastModifiedDate: { type: String },
    completionFraction: { type: String },
    isReady: { type: Boolean },
});

const isModalOpen = ref(false)
</script>

<template>
    <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body card-content-custom">
            <h2 class="card-header text-lg">{{ props.profileName }}</h2>
            <section>
                <p class="text-sm">
                    Last Modified: {{ props.lastModifiedDate }}
                </p>
                <p class="text-sm">
                    Forms completed: {{ props.completionFraction }}
                </p>
                <p v-if="!isReady" class="text-sm font-bold">
                    {{ "Incomplete ❌" }}
                </p>
                <p v-else class="text-sm">
                    {{ "Ready for use ✅" }}
                </p>
            </section>
            <section class="flex gap-4">
                <UButton
                    color="neutral"
                    @click="$emit('editCallback')"
                    class="cursor-pointer"
                    >Edit</UButton
                >
                <UButton
                    color="neutral"
                    variant="outline"
                    @click="() => isModalOpen = true"
                    
                    class="cursor-pointer"
                    >Delete</UButton
                >
            </section>
        </div>
    </div>

    <UModal
        v-model:open="isModalOpen"
        :title="`Are you sure you want to delete ${profileName}?`"
        description=""
        :ui="{ footer: 'justify-end' }"
    >
        <!-- <UButton label="Open" color="neutral" variant="subtle" /> -->

        <template #body>
            <p>This action is not reversible</p>
        </template>

        <template #footer="{ close }">
            <UButton
                label="Cancel"
                color="neutral"
                variant="outline"
                @click="close"
            />
            <UButton label="Delete" color="neutral" />
        </template>
    </UModal>
    <p>{{ isModalOpen }}</p>
</template>

<style lang="scss">
.card-content-custom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.card-header {
    font-size: 1.25rem;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    line-clamp: 1;
    word-break: break-word;
}
</style>
