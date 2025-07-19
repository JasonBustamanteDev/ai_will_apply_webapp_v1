<script setup>
import { profileNameSchema } from "../../views/formValidation";

const props = defineProps({
    profileName: { type: String },
    lastModifiedDate: { type: String },
    completionFraction: { type: String },
    isReady: { type: Boolean },
    rowData: { type: Object, required: true },
});
const emit = defineEmits(["deleteProfile", "renameProfile", "copyProfile", "editCallback"]);

// Delete profile logic
const isDeleteProfileModalOpen = ref(false);
const deleteButtonHandler = () => {
    isDeleteProfileModalOpen.value = false;
    emit("deleteProfile", props.profileName);
};

// Rename profile logic
const isRenameProfileModalOpen = ref(false);
const renameFormState = reactive({
    profileName: "", // key must match the name attributes on UFormField elements
});
const renameButtonHandler = async () => {
    try {
        // Validate the profileName
        if (!renameFormState.profileName) return;
        await profileNameSchema.validate(renameFormState);

        // Close window and emit event which sends a request to the backend
        isRenameProfileModalOpen.value = false;
        emit("renameProfile", props.profileName, renameFormState.profileName);
    } catch (err) {
        console.error(err);
    }
};

// Copy profile logic
const isCopyProfileModalOpen = ref(false);
const copyFormState = reactive({
    profileName: "", // key must match the name attributes on UFormField elements
});
const copyButtonHandler = async () => {
    try {
        // Validate the profileName
        if (!copyFormState.profileName) return;
        await profileNameSchema.validate(copyFormState);

        // Close window and emit event which sends a request to the backend
        isCopyProfileModalOpen.value = false;
        emit("copyProfile", copyFormState.profileName, props.rowData);
    } catch (err) {
        console.error(err);
    }
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
                    @click="$emit('editCallback', props.profileName)"
                    class="cursor-pointer"
                    >Edit</UButton
                >
                <UButton
                    color="neutral"
                    @click="() => (isRenameProfileModalOpen = true)"
                    class="cursor-pointer"
                    >Rename</UButton
                >
                <UButton
                    color="neutral"
                    @click="() => (isCopyProfileModalOpen = true)"
                    class="cursor-pointer"
                    >Copy</UButton
                >
                <UButton
                    color="neutral"
                    variant="outline"
                    @click="() => (isDeleteProfileModalOpen = true)"
                    class="cursor-pointer !bg-[#ca2525] text-white"
                    >Delete</UButton
                >
            </section>
        </div>
    </div>

    <!-- DELETE PROFILE MODAL -->
    <UModal
        v-model:open="isDeleteProfileModalOpen"
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

    <!-- RENAME PROFILE MODAL -->
    <UModal
        v-model:open="isRenameProfileModalOpen"
        :title="`Rename Profile`"
        description=""
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <p>Enter new name here (max 28 chars)</p>
            <p>Use numbers, letters, and spaces only</p>
            <UForm
                :schema="profileNameSchema"
                :state="renameFormState"
                class="space-y-4 uform-element pt-4 h-[70px]"
                @submit="renameButtonHandler"
            >
                <UFormField label="" name="profileName" class="mb-0">
                    <UInput
                        v-model="renameFormState.profileName"
                        class="w-full"
                    />
                </UFormField>
            </UForm>
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
                label="Rename"
                color="neutral"
                class="cursor-pointer"
                @click="renameButtonHandler"
            />
        </template>
    </UModal>

    <!-- COPY PROFILE MODAL -->
    <UModal
        v-model:open="isCopyProfileModalOpen"
        title="Copy Profile"
        description=""
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <p>Enter new name here (max 28 chars)</p>
            <p>Use numbers, letters, and spaces only</p>
            <UForm
                :schema="profileNameSchema"
                :state="copyFormState"
                class="space-y-4 uform-element pt-4 h-[70px]"
                @submit="copyButtonHandler"
            >
                <UFormField label="" name="profileName" class="mb-0">
                    <UInput
                        v-model="copyFormState.profileName"
                        class="w-full"
                    />
                </UFormField>
            </UForm>
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
                label="Copy Profile"
                color="neutral"
                class="cursor-pointer"
                @click="copyButtonHandler"
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
