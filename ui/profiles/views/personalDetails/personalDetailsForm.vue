<script setup>
import { object, string, number, boolean } from "yup";
import { verifyMinStringLength, cleanPhoneNumber } from "~/shared/client_helpers"; // prettier-ignore
import { genders, ethnicGroups, educationLevels } from "~/ui/profiles/views/personalDetails/personalDetailsForm.js"; // prettier-ignore
import { booleanPlusEmptyOptions } from "~/ui/profiles/shared/constants.js";

const MESSAGES = {
    REQUIRED: "This field is required",
    MIN_AGE: "Age must be 13 or higher",
    VALID_OPTION: "Please select a valid option",
};

const profileSchema = object({
    firstName: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty names", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    lastName: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty names", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    age: number().required(MESSAGES.REQUIRED),
    yearsOfExperience: number()
        .typeError("Enter a valid number")
        .required(MESSAGES.REQUIRED)
        .test("yearsExpValidation", "Must be above 0", function (value) {
            if (value <= 0) return false;
            return true;
        }),
    email: string().email("Invalid email").required(MESSAGES.REQUIRED),
    phoneNumber: string()
        .required(MESSAGES.REQUIRED)
        .test(
            "phone-validation",
            "Enter a valid phone number",
            function (value) {
                if (!value) return false;

                // Remove spaces, dashes, and other formatting characters (keep + for international)
                const cleaned = cleanPhoneNumber(value);

                // Check if it's a valid phone number (10-15 digits, optionally starting with +)
                return /^(\+?[1-9]\d{9,14})$/.test(cleaned);
            }
        ),
    gender: string()
        .nullable()
        .oneOf(
            genders.map((g) => g.value),
            MESSAGES.VALID_OPTION
        ),
    ethnicity: string()
        .nullable()
        .oneOf(
            ethnicGroups.map((g) => g.value),
            MESSAGES.VALID_OPTION
        ),
    educationLevel: string()
        .required(MESSAGES.REQUIRED)
        .oneOf(
            educationLevels.map((g) => g.value),
            MESSAGES.VALID_OPTION
        ),
    securityClearance: string()
        .nullable()
        .oneOf(
            booleanPlusEmptyOptions.map((g) => g.value),
            MESSAGES.VALID_OPTION
        ),
    disability: boolean().nullable(),
});

const formState = reactive({
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
});

const onSubmit = async () => {
    try {
        let user = await profileSchema.validate(formState);
        // TODO: send request to backend
        console.log(user);
    } catch (err) {
        console.error(err);
    }
};
</script>

<template>
    <UForm
        :schema="profileSchema"
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
                class="w-full justify-center"
                color="secondary"
                @click="onSubmit"
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
