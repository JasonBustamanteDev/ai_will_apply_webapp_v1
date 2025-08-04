<script setup>
import { genders, ethnicGroups, educationLevels } from "~/ui/profiles/views/personalDetails/personalDetailsForm.js"; // prettier-ignore
import { booleanPlusEmptyOptions } from "~/ui/profiles/shared/constants.js";
import { personalDetailsSchema } from "../formValidation.js";
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
        firstName: undefined,
        lastName: undefined,
        age: 18,
        yearsOfExperience: 2,
        email: undefined,
        gender: undefined,
        phoneNumber: undefined,
        ethnicity: undefined,
        securityClearance: undefined,
        disability: undefined,
        educationLevel: undefined,
    }
);

const onSubmit = async () => {
    let isValidationError = true;
    try {
        // Validate schema
        await personalDetailsSchema.validate(formState);
        isValidationError = false;

        // Send backend request to update profile
        await updateProfile(supabaseProjectURL, props.encodedProfileName, {
            [props.formName]: formState,
        });

        // Close collapse component and render success toast
        document.getElementById(COLLAPSE_NAMES.PERSONAL_DETAILS).checked = false; // prettier-ignore
        showSuccessToast(
            "Form Submitted",
            "Fill out the remaining forms or start job hunting"
        );
    } catch (err) {
        console.error(err);
        if (!isValidationError) {
            showErrorToast(
                "ERROR: UPDATE PERSONAL DETAILS",
                err?.data?.detail ||
                    err?.message ||
                    "Request to update personal details failed.",
                true
            );
        }
    }
};
</script>

<template>
    <UForm
        :schema="personalDetailsSchema"
        :state="formState"
        class="space-y-4 uform-element pt-4"
        @submit="onSubmit"
    >
        <UFormField label="First Name **" name="firstName" class="mb-0">
            <UInput v-model="formState.firstName" class="w-full" />
        </UFormField>
        <UFormField label="Last Name **" name="lastName" class="mb-0">
            <UInput v-model="formState.lastName" class="w-full" />
        </UFormField>
        <UFormField label="Age **" name="age" class="mb-0">
            <UInputNumber
                v-model="formState.age"
                :min="13"
                :max="120"
                class="w-full"
                color="neutral"
            />
        </UFormField>
        <UFormField label="Email **" name="email" class="mb-0">
            <UInput v-model="formState.email" class="w-full" />
        </UFormField>
        <UFormField label="Phone Number **" name="phoneNumber" class="mb-0">
            <UInput v-model="formState.phoneNumber" class="w-full" />
        </UFormField>
        <UFormField
            label="Years of Experience in Field **"
            name="yearsOfExperience"
            class="mb-0"
        >
            <UInput
                v-model="formState.yearsOfExperience"
                class="w-full"
                placeholder=""
            />
        </UFormField>
        <UFormField
            label="Highest Education Level **"
            name="educationLevel"
            class="mb-0"
        >
            <USelect
                v-model="formState.educationLevel"
                :items="educationLevels"
                class="w-full"
        /></UFormField>
        <UFormField label="Gender" name="gender" class="mb-0">
            <USelect
                v-model="formState.gender"
                :items="genders"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Ethnicity" name="ethnicity" class="mb-0">
            <USelect
                v-model="formState.ethnicity"
                :items="ethnicGroups"
                class="w-full"
            />
        </UFormField>
        <UFormField
            label="Security Clearance"
            name="securityClearance"
            class="mb-0"
        >
            <USelect
                v-model="formState.securityClearance"
                :items="booleanPlusEmptyOptions"
                class="w-full"
            />
        </UFormField>
        <UFormField
            label="Do you have a disability?"
            name="disability"
            class="mb-0"
        >
            <USelect
                v-model="formState.disability"
                :items="booleanPlusEmptyOptions"
                class="w-full"
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
    grid-template-rows: 95px 95px 95px auto;
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
