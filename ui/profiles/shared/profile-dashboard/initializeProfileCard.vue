<script setup lang="ts">
import AddProfileSvg from "~/ui/svgs/addProfile.vue";
import { profileNameSchema } from "../../views/formValidation";

const emit = defineEmits(["initializeProfile"]);
const isInitializeProfileModalOpen = ref(false);

const formState = reactive({
    profileName: "", // key must match the name attributes on UFormField elements
});

const initializeButtonHandler = async () => {
    try {
        // Validate the profileName
        if (!formState.profileName) return;
        await profileNameSchema.validate(formState);

        // Close window and emit event which sends a request to the backend
        isInitializeProfileModalOpen.value = false;
        emit("initializeProfile", formState.profileName);

        formState.profileName = "";
    } catch (err) {
        console.error(err);
    }
};
</script>

<template>
    <!-- DaisyUI components used for the cards -->
    <div
        @click="() => (isInitializeProfileModalOpen = true)"
        class="cursor-pointer card bg-base-100 w-full shadow-sm"
    >
        <div class="create-new-card text-center">
            <div class="w-[40px] mx-auto mb-3">
                <AddProfileSvg />
            </div>
            <h2 class="card-title text-lg">Create New Profile</h2>
            <p class="text-sm">
                Enter your information then use the profile when applying for
                jobs
            </p>
        </div>
    </div>

    <!-- INITIALIZE PROFILE MODAL -->
    <UModal
        v-model:open="isInitializeProfileModalOpen"
        :title="'Create New Profile'"
        description=""
        :ui="{ footer: 'justify-end' }"
    >
        <template #body>
            <p>Enter profile name here</p>
            <p>Use numbers, letters, and spaces only</p>
            <UForm
                :schema="profileNameSchema"
                :state="formState"
                class="space-y-4 uform-element pt-4 h-[70px] w-full"
                @submit="initializeButtonHandler"
            >
                <UFormField label="" name="profileName" class="mb-0">
                    <UInput v-model="formState.profileName" class="w-[464px]" />
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
                label="Create Profile"
                color="neutral"
                class="cursor-pointer"
                @click="initializeButtonHandler"
            />
        </template>
    </UModal>
</template>

<style lang="scss"></style>
