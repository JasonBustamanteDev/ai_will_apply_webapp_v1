<script setup>
import { educationSchema } from "../formValidation";
import { booleanPlusEmptyOptions, booleanOptions, radioStyleObject } from "~/ui/profiles/shared/constants.js"; // prettier-ignore
import { updateProfile } from "~/ui/profiles/apiCalls/updateProfile.js";
import { useCustomToast } from "~/pinia_stores/toast";

const props = defineProps({
    data: {
        type: Object,
        required: false,
    },
    formName: {
        type: String,
        required: true,
    },
    encodedProfileName: {
        type: String,
        required: true,
    },
});

const { showSuccessToast, showErrorToast } = useCustomToast();
const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const formState = reactive(
    props.data || {
        // These keys must match the name attributes on UFormField elements
        institutionName: undefined,
        fieldOfStudy: undefined,
        institutionCity: undefined,
        institutionProvince: undefined,
        gpa: undefined,
        startDate: undefined,
        endDate: undefined,
        currentlyAttending: undefined,
    }
);

const onSubmit = async () => {
    let isValidationError = true;
    try {
        // Validate schema
        await educationSchema.validate(formState);
        isValidationError = false;

        // Send backend request to update profile
        await updateProfile(supabaseProjectURL, props.encodedProfileName, {
            [props.formName]: formState,
        });

        // Close collapse component and render success toast
        document.getElementById(COLLAPSE_NAMES.EDUCATION).checked = false;
        showSuccessToast(
            "Form Submitted",
            "Fill out the remaining forms or start job hunting"
        );
    } catch (err) {
        console.error(err);
        if (!isValidationError) {
            showErrorToast(
                "ERROR: UPDATE EDUCATION",
                err?.data?.detail ||
                    err?.message ||
                    "Request to update education failed.",
                true
            );
        }
    }
};
</script>

<template>
    <UForm
        :schema="educationSchema"
        :state="formState"
        class="space-y-4 uform-element pt-4"
        color="secondary"
        @submit="onSubmit"
    >
        <UFormField
            label="Institution Name **"
            name="institutionName"
            class="mb-0"
        >
            <UInput v-model="formState.institutionName" class="w-full" />
        </UFormField>
        <UFormField label="Field of Study **" name="fieldOfStudy" class="mb-0">
            <UInput v-model="formState.fieldOfStudy" class="w-full" />
        </UFormField>
        <UFormField
            label="Institution City **"
            name="institutionCity"
            class="mb-0"
        >
            <UInput v-model="formState.institutionCity" class="w-full" />
        </UFormField>
        <UFormField
            label="Institution Province or State **"
            name="institutionProvince"
            class="mb-0"
        >
            <UInput
                v-model="formState.institutionProvince"
                class="w-full"
                placeholder="Example: 'Ontario' or 'ON'"
            />
        </UFormField>
        <UFormField label="Start Date **" name="startDate" class="mb-0">
            <UInput
                v-model="formState.startDate"
                class="w-full"
                placeholder="YYYY-MM"
            />
        </UFormField>
        <UFormField label="End Date **" name="endDate" class="mb-0">
            <UInput
                v-model="formState.endDate"
                class="w-full"
                placeholder="YYYY-MM"
            />
        </UFormField>
        <UFormField
            label="Currently Attending **"
            name="currentlyAttending"
            class="mb-0"
        >
            <URadioGroup
                v-model="formState.currentlyAttending"
                orientation="horizontal"
                variant="list"
                :items="booleanOptions"
                class="mt-2"
                size="xl"
                :ui="radioStyleObject"
            />
        </UFormField>

        <UFormField label="GPA" name="gpa" class="mb-0">
            <UInput
                v-model="formState.gpa"
                class="w-full"
                placeholder="Decimal between 1 to 4"
            />
        </UFormField>

        <div class="uform-submit-button-container">
            <UButton
                type="submit"
                class="w-full justify-center cursor-pointer"
                color="secondary"
                >Submit</UButton
            >
        </div>
    </UForm>
</template>

<style lang="scss" scoped>
.uform-element {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 95px 95px auto;
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
