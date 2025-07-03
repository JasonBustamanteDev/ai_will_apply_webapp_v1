<script setup>
import { object, string, number } from "yup";
import {
    verifyMinStringLength,
    cleanPhoneNumber,
} from "~/shared/helper_methods";
import {
    genders,
    ethnicGroups,
    booleanOptions,
} from "~/ui/profiles/personalDetails/personalDetailsForm.js";

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
    age: number()
        .required(MESSAGES.REQUIRED)
        .min(13, MESSAGES.MIN_AGE)
        .integer("Age must be a whole number")
        .positive(MESSAGES.MIN_AGE)
        .test("min-age", MESSAGES.MIN_AGE, (value) => value >= 13),
    email: string().email("Invalid email").required(MESSAGES.REQUIRED),
    phoneNumber: string()
        .required(MESSAGES.REQUIRED)
        .test(
            "phone-validation",
            "Please enter a valid phone number",
            function (value) {
                if (!value) return false;

                // Remove spaces, dashes, and other formatting characters (keep + for international)
                const cleaned = cleanPhoneNumber(value);

                // Check if it's a valid phone number (10-15 digits, optionally starting with +)
                return /^(\+?[1-9]\d{9,14})$/.test(cleaned);
            }
        ),
    gender: string().oneOf(
        genders.map((g) => g.value),
        MESSAGES.VALID_OPTION
    ),
    ethnicity: string().oneOf(
        ethnicGroups.map((g) => g.value),
        MESSAGES.VALID_OPTION
    ),
    securityClearance: string().oneOf(
        booleanOptions.map((g) => g.value),
        MESSAGES.VALID_OPTION
    ),
    disability: string().oneOf(
        booleanOptions.map((g) => g.value),
        MESSAGES.VALID_OPTION
    ),
    portfolioUrl: string()
        .url("Enter a valid URL like https://example.com")
        .matches(/^https?:\/\/.+/, "URL must start with http:// or https://"),

    //#region My Custom Section

    // SOCIALS
    // linkedin
    // twitter
    // github

    // PREFERENCES
    // current salary
    // expected salary
    // notice period
    // total experience
    // companies to exclude from search
    // willing to relocate
    // driving liscence
    // veteran status

    // cover letter

    // EDUCATION
    // major
    // college name
    // College city
    // College State
    // time-start
    // time-end
    // gpa

    // // EXTREME
    // skills list
    //#endregion
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    firstName: undefined,
    lastName: undefined,
    age: undefined,
    email: undefined,
    gender: undefined,
    phoneNumber: undefined,
    ethnicity: undefined,
    securityClearance: undefined,
    disability: undefined,
    portfolioUrl: undefined,
});

const onSubmit = async function () {
    try {
        let user = await profileSchema.validate();
        // TODO: send request to backend
        console.log(user);
    } catch (err) {
        console.error(err);
        console.log(profileSchema);
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
        <UFormField label="First Name" name="firstName" class="mb-0">
            <UInput v-model="formState.firstName" class="w-full" />
        </UFormField>
        <UFormField label="Last Name" name="lastName" class="mb-0">
            <UInput v-model="formState.lastName" class="w-full" />
        </UFormField>
        <UFormField label="Age" name="age" class="mb-0">
            <UInput v-model="formState.age" type="number" class="w-full" />
        </UFormField>
        <UFormField label="Email" name="email" class="mb-0">
            <UInput v-model="formState.email" class="w-full" />
        </UFormField>
        <UFormField label="Gender" name="gender" class="mb-0">
            <USelect
                v-model="formState.gender"
                :items="genders"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Phone Number" name="phoneNumber" class="mb-0">
            <UInput v-model="formState.phoneNumber" class="w-full" />
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
                :items="booleanOptions"
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
                :items="booleanOptions"
                class="w-full"
            />
        </UFormField>

        <!-- This field must be on the last row, where height is more than 95px (error msg runs long)-->
        <UFormField label="Portfolio URL" name="portfolioUrl" class="mb-0">
            <UInput v-model="formState.portfolioUrl" class="w-full" />
        </UFormField>

        <div class="submit-button-container">
            <UButton
                type="submit"
                class="w-full justify-center"
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
    grid-template-rows: 95px 95px 120px;
    gap: 0.5rem 1rem;
}

.submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
