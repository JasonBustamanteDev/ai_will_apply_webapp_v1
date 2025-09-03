<script setup lang="ts">
import { genders, ethnicGroups, educationLevels } from "~/ui/profiles/views/personalDetails/personalDetailsForm.js"; // prettier-ignore
import { booleanPlusEmptyOptions } from "~/ui/profiles/shared/constants.js";
import { personalDetailsSchema } from "../formValidation.js";
import { updateProfile } from "~/ui/profiles/apiCalls/updateProfile.js";
import { useCustomToast } from "~/pinia_stores/toast";
import type { PersonalDetailsRaw } from "~/types/forms/personalDetails";

const props = defineProps<{
    rawFormData: PersonalDetailsRaw;
    formName: string;
    encodedProfileName: string;
}>();

const { showSuccessToast, showErrorToast } = useCustomToast();
const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const formState = reactive(
    props.rawFormData.data || {
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
        // @ts-ignore
        document.getElementById(COLLAPSE_NAMES.PERSONAL_DETAILS).checked = false; // prettier-ignore
        showSuccessToast(
            "Form Submitted",
            "Fill out the remaining forms or start job hunting"
        );

        // Update props data to avoid refetching data
        props.rawFormData.isComplete = true; // set chip to true
        props.rawFormData.data = formState;
    } catch (err: any) {
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
            <UInput
                v-model="formState.firstName"
                class="w-full"
                data-testid="first_name_field"
            />
        </UFormField>
        <UFormField label="Last Name **" name="lastName" class="mb-0">
            <UInput
                v-model="formState.lastName"
                class="w-full"
                data-testid="last_name_field"
            />
        </UFormField>
        <UFormField label="Age **" name="age" class="mb-0">
            <UInputNumber
                v-model="formState.age"
                :min="13"
                :max="120"
                class="w-full"
                color="neutral"
                data-testid="age_field"
            />
        </UFormField>
        <UFormField label="Email **" name="email" class="mb-0">
            <UInput
                v-model="formState.email"
                class="w-full"
                data-testid="email_field"
            />
        </UFormField>
        <UFormField label="Phone Number **" name="phoneNumber" class="mb-0">
            <UInput
                v-model="formState.phoneNumber"
                class="w-full"
                data-testid="phone_number_field"
            />
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
                data-testid="years_experience_field"
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
                data-testid="highest_education_field"
        /></UFormField>
        <UFormField label="Gender" name="gender" class="mb-0">
            <USelect
                v-model="formState.gender"
                :items="genders"
                class="w-full"
                data-testid="gender_field"
            />
        </UFormField>
        <UFormField label="Ethnicity" name="ethnicity" class="mb-0">
            <USelect
                v-model="formState.ethnicity"
                :items="ethnicGroups"
                class="w-full"
                data-testid="ethnicity_field"
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
                data-testid="clearance_field"
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
                data-testid="disability_field"
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
