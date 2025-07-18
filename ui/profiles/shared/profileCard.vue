<script setup>
const props = defineProps({
    profileName: { type: String },
    lastModifiedDate: { type: String },
    completionFraction: { type: String },
    isReady: { type: Boolean },
});
const emit = defineEmits(["deleteProfile"]);

const isModalOpen = ref(false);

const deleteButtonHandler = () => {
    isModalOpen.value = false;
    emit("deleteProfile", props.profileName);
};
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
            <section class="flex gap-2">
                <UButton
                    color="neutral"
                    @click="$emit('editCallback')"
                    class="cursor-pointer"
                    >Edit</UButton
                >

                <!-- Hook up the following 2 -->
                <UButton
                    color="neutral"
                    @click="$emit('editCallback')"
                    class="cursor-pointer"
                    >Rename</UButton
                >
                <UButton
                    color="neutral"
                    @click="$emit('editCallback')"
                    class="cursor-pointer"
                    >Copy</UButton
                >

                <UButton
                    color="neutral"
                    variant="outline"
                    @click="() => (isModalOpen = true)"
                    class="cursor-pointer !bg-[#ca2525] text-white"
                    >Delete</UButton
                >
                
            </section>
        </div>
    </div>

    <!-- DELETE PROFILE MODAL -->
    <UModal
        v-model:open="isModalOpen"
        :title="`Are you sure you want to delete ${profileName}?`"
        description=""
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <p>This action is not reversible</p>
            <p>Consider reviewing your answers first</p>
        </template>

        <template #footer="{ close }">
            <UButton
                label="Cancel"
                color="neutral"
                variant="outline"
                class="cursor-pointer"
                @click="close"
            />
            <UButton
                label="Delete"
                color="error"
                class="cursor-pointer !bg-[#ca2525]"
                @click="deleteButtonHandler"
            />
        </template>
    </UModal>
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
