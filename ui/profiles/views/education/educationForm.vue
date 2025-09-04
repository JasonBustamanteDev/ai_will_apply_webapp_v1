<script setup lang="ts">
import { educationSchema } from "../formValidation";
import { booleanOptions, radioStyleObject } from "~/ui/profiles/shared/constants.js"; // prettier-ignore
import { updateProfile } from "~/ui/profiles/apiCalls/updateProfile.js";
import { useCustomToast } from "~/pinia_stores/toast";
import type { EducationRaw } from "~/types/forms/education";

const props = defineProps<{
    rawFormData: EducationRaw;
    formName: string;
    encodedProfileName: string;
}>();

const { showSuccessToast, showErrorToast } = useCustomToast();
const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const formState = reactive(
    props.rawFormData.data || {
        // These keys must match the name attributes on UFormField elements
        haveHigherEducation: true,
        institutionName: undefined,
        fieldOfStudy: undefined,
        institutionCity: undefined,
        institutionProvince: undefined,
        gpa: undefined,
        startDate: undefined,
        endDate: undefined,
        currentlyAttending: false,
    }
);

const conditionalDisableStyles = computed(() => {
    return formState.haveHigherEducation === false
        ? "opacity-50 pointer-events-none"
        : "";
});

const onSubmit = async () => {
    let isValidationError = true;
    try {
        // Validate schema
        await educationSchema.validate(formState);
        isValidationError = false;

        // Send backend request to update profile
        await updateProfile(supabaseProjectURL, props.encodedProfileName, {
            [props.formName]:
                formState.haveHigherEducation === false
                    ? { haveHigherEducation: false } // only save 1 property if user never went to college
                    : formState,
        });

        // Close collapse component and render success toast
        // @ts-ignore
        document.getElementById(COLLAPSE_NAMES.EDUCATION).checked = false;
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
        @submit="onSubmit"
        :schema="educationSchema"
        :state="formState"
        :class="`space-y-4 uform-element pt-4`"
        color="secondary"
    >
        <!--  prettier-ignore -->
        <USwitch
            v-model="formState.haveHigherEducation"
            :label="formState.haveHigherEducation ? `I've attended college or university` : `I have NOT attended college or university`"
            size="lg"
            class="mt-3 mb-6 col-span-full"
            data-testid="have_higher_education_field"
        />
        <UFormField
            label="Institution Name **"
            name="institutionName"
            :class="`mb-0 ${conditionalDisableStyles}`"
        >
            <UInput 
                v-model="formState.institutionName" 
                class="w-full" 
                data-testid="institution_name_field"
            />
        </UFormField>
        <UFormField
            label="Field of Study **"
            name="fieldOfStudy"
            :class="`mb-0 ${conditionalDisableStyles}`"
        >
            <UInput 
                v-model="formState.fieldOfStudy" 
                class="w-full" 
                data-testid="field_of_study_field"
            />
        </UFormField>
        <UFormField
            label="Institution City **"
            name="institutionCity"
            :class="`mb-0 ${conditionalDisableStyles}`"
        >
            <UInput 
                v-model="formState.institutionCity" 
                class="w-full" 
                data-testid="institution_city_field"
            />
        </UFormField>
        <UFormField
            label="Institution Province or State **"
            name="institutionProvince"
            :class="`mb-0 ${conditionalDisableStyles}`"
        >
            <UInput
                v-model="formState.institutionProvince"
                class="w-full"
                placeholder="Example: 'Ontario' or 'ON'"
                data-testid="institution_province_field"
            />
        </UFormField>
        <UFormField
            label="Start Date **"
            name="startDate"
            :class="`mb-0 ${conditionalDisableStyles}`"
        >
            <UInput
                v-model="formState.startDate"
                class="w-full"
                placeholder="YYYY-MM"
                data-testid="start_date_field"
            />
        </UFormField>
        <UFormField
            label="End Date **"
            name="endDate"
            :class="`mb-0 ${conditionalDisableStyles}`"
        >
            <UInput
                v-model="formState.endDate"
                class="w-full"
                placeholder="YYYY-MM"
                data-testid="end_date_field"
            />
        </UFormField>
        <UFormField
            label="Currently Attending **"
            name="currentlyAttending"
            :class="`mb-0 ${conditionalDisableStyles}`"
        >
            <!-- Could avoid use of any keyword here, but it'd mean we'd need to stop using booleans in Yup validator (not great) -->
            <URadioGroup
                v-model="formState.currentlyAttending as any"
                orientation="horizontal"
                variant="list"
                :items="booleanOptions as any"
                class="mt-2"
                size="xl"
                :ui="radioStyleObject"
                data-testid="currently_attending_field"
            />
        </UFormField>

        <UFormField
            label="GPA"
            name="gpa"
            :class="`mb-0 ${conditionalDisableStyles}`"
        >
            <UInput
                v-model="formState.gpa"
                class="w-full"
                placeholder="Decimal between 1 to 4"
                data-testid="gpa_field"
            />
        </UFormField>

        <div class="uform-submit-button-container">
            <UButton
                type="submit"
                class="w-full justify-center cursor-pointer"
                color="secondary"
                data-testid="education_submit_button"
                >Submit</UButton
            >
        </div>
    </UForm>
</template>

<style lang="scss" scoped>
.uform-element {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto 95px 95px auto;
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
