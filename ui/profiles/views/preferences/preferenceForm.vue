<script setup lang="ts">
import { preferenceSchema } from "../formValidation";
import { booleanOptions, radioStyleObject } from "~/ui/profiles/shared/constants.js"; // prettier-ignore
import { updateProfile } from "~/ui/profiles/apiCalls/updateProfile.js";
import { useCustomToast } from "~/pinia_stores/toast";
import type { PreferenceRaw } from "~/types/forms/preferences";

const props = defineProps<{
    rawFormData: PreferenceRaw;
    formName: string;
    encodedProfileName: string;
}>();

const { showSuccessToast, showErrorToast } = useCustomToast();
const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const formState = reactive(
    props.rawFormData.data || {
        // These keys must match the name attributes on UFormField elements
        currentAnnualSalary: 40000,
        expectedAnnualSalary: 60000,
        noticePeriod: 14,
        willingToRelocate: true,
        driversLicense: true,
        reliableTransportation: true,
        veteranStatus: false,
        interviewAvailability: "Monday to Friday between 9AM and 5PM",
        companyBlacklist: ["Some terrible company"],
    }
);

const onSubmit = async () => {
    let isValidationError = true;
    try {
        // Validate schema
        await preferenceSchema.validate(formState);
        isValidationError = false;

        // Send backend request to update profile
        await updateProfile(supabaseProjectURL, props.encodedProfileName, {
            [props.formName]: formState,
        });

        // Close collapse component and render success toast
        // @ts-ignore
        document.getElementById(COLLAPSE_NAMES.PREFERENCES).checked = false; // prettier-ignore
        showSuccessToast(
            "Form Submitted",
            "Fill out the remaining forms or start job hunting"
        );

        // Update props data to avoid refetching data
        props.rawFormData.isComplete = true;
        props.rawFormData.data = formState;
    } catch (err: any) {
        console.error(err);
        if (!isValidationError) {
            showErrorToast(
                "ERROR: UPDATE PREFERENCE FORM",
                err?.data?.detail ||
                    err?.message ||
                    "Request to update preferences failed.",
                true
            );
        }
    }
};
</script>

<template>
    <UForm
        :schema="preferenceSchema"
        :state="formState"
        class="space-y-4 uform-element pt-4"
        @submit="onSubmit"
    >
        <UFormField
            label="Current Annual Salary **"
            name="currentAnnualSalary"
            class="mb-0"
        >
            <UInputNumber
                v-model="formState.currentAnnualSalary"
                :min="0"
                :max="10000000"
                :step="1000"
                class="w-full"
                color="neutral"
                data-testid="current_salary_field"
            />
        </UFormField>
        <UFormField
            label="Expected Annual Salary **"
            name="expectedAnnualSalary"
            class="mb-0"
        >
            <UInputNumber
                v-model="formState.expectedAnnualSalary"
                :min="0"
                :max="10000000"
                :step="1000"
                class="w-full"
                color="neutral"
                data-testid="expected_salary_field"
            />
        </UFormField>
        <UFormField
            label="How many days until you can start? **"
            name="noticePeriod"
            class="mb-0 col-span-2"
        >
            <UInputNumber
                v-model="formState.noticePeriod"
                :min="0"
                :max="720"
                :step="1"
                class="w-full"
                color="neutral"
                data-testid="notice_period_field"
            />
        </UFormField>

        <UFormField
            label="Willing to Relocate **"
            name="willingToRelocate"
            class="mb-0"
        >
            <URadioGroup
                v-model="formState.willingToRelocate as any"
                orientation="horizontal"
                variant="list"
                :items="booleanOptions as any"
                class="mt-2"
                size="xl"
                :ui="radioStyleObject"
                data-testid="relocation_field"
            />
        </UFormField>
        <UFormField
            label="Have Driver's Licence **"
            name="driversLicense"
            class="mb-0"
        >
            <URadioGroup
                v-model="formState.driversLicense as any"
                orientation="horizontal"
                variant="list"
                :items="booleanOptions as any"
                class="mt-2"
                size="xl"
                :ui="radioStyleObject"
                data-testid="license_field"
            />
        </UFormField>
        <UFormField
            label="Do you own a Car? **"
            name="reliableTransportation"
            class="mb-0"
        >
            <URadioGroup
                v-model="formState.reliableTransportation as any"
                orientation="horizontal"
                variant="list"
                :items="booleanOptions as any"
                class="mt-2"
                size="xl"
                :ui="radioStyleObject"
                data-testid="transportation_field"
            />
        </UFormField>
        <UFormField
            label="Are you a veteran? **"
            name="veteranStatus"
            class="mb-0"
        >
            <URadioGroup
                v-model="formState.veteranStatus as any"
                orientation="horizontal"
                variant="list"
                :items="booleanOptions as any"
                class="mt-2"
                size="xl"
                :ui="radioStyleObject"
                data-testid="veteran_field"
            />
        </UFormField>
        <UFormField
            label="When are you available for interviews? **"
            name="interviewAvailability"
            class="mb-0 col-span-2"
        >
            <UInput
                v-model="formState.interviewAvailability"
                class="w-full"
                placeholder=""
                data-testid="interview_availability_field"
            />
        </UFormField>
        <UFormField
            label="Avoid applying to these companies:"
            name="companyBlacklist"
            class="mb-0 col-span-2"
            data-testid="company_blacklist_parent"
        >
            <UInputTags
                v-model="formState.companyBlacklist"
                :max="20"
                class="w-full h-auto mb-12"
                data-testid="company_blacklist_field"
            />
        </UFormField>

        <div class="uform-submit-button-container">
            <UButton
                type="submit"
                class="w-full justify-center cursor-pointer"
                color="secondary"
                data-testid="preference_submit_button"
                >Submit</UButton
            >
        </div>
    </UForm>
</template>

<style lang="scss" scoped>
.uform-element {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(2, 80px) auto auto;
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
