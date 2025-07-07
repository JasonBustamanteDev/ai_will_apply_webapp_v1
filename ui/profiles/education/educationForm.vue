<script setup>
import { object, string, boolean } from "yup";
import { emptyOrMinLengthStringAccepted } from "~/shared/helper_methods";
import { booleanOptions } from "~/ui/profiles/shared/util.js";
import { isValidYearMonth } from "./educationForm";

// EDUCATION (everything is optional)
// institutionName (non empty string)

// field of study (non empty string)
// College city
// College State
// time-start
// time-end
// gpa

// TODO: Submit better contain a changed value
const MESSAGES = {
    REQUIRED: "This field is required",
    ONLY_EMPTY: "Answer cannot be empty spaces",
};
const CURRENT_STRING = "current";

const educationSchema = object({
    institutionName: string()
        .required(MESSAGES.REQUIRED)
        .test("institutionName", MESSAGES.ONLY_EMPTY, (value) =>
            emptyOrMinLengthStringAccepted(value, 1)
        ),
    fieldOfStudy: string()
        .required(MESSAGES.REQUIRED)
        .test("fieldOfStudy", MESSAGES.ONLY_EMPTY, (value) =>
            emptyOrMinLengthStringAccepted(value, 1)
        ),
    institutionCity: string()
        .required(MESSAGES.REQUIRED)
        .test("institutionCity", MESSAGES.ONLY_EMPTY, (value) =>
            emptyOrMinLengthStringAccepted(value, 1)
        ),
    institutionProvince: string()
        .required(MESSAGES.REQUIRED)
        .test("institutionProvince", MESSAGES.ONLY_EMPTY, (value) =>
            emptyOrMinLengthStringAccepted(value, 1)
        ),
    gpa: string("Invalid number")
        .nullable()
        .notRequired()
        .test("gpa", "Type a decimal between 1 to 5", (value) => {
            if (value === undefined || value === "") return true;
            try {
                const num = Number(value);
                return value >= 1 && value <= 5;
            } catch {
                return false;
            }
        }),
    startDate: string()
        .required(MESSAGES.REQUIRED)
        .test("start-date", "YYYY-MM format required", (value) => {
            return isValidYearMonth(value);
        }),
    endDate: string()
        .required(MESSAGES.REQUIRED)
        .test("start-date", "YYYY-MM format required", (value) => {
            return isValidYearMonth(value);
        }),
    currentlyAttending: boolean().required(MESSAGES.REQUIRED),
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    institutionName: undefined,
    fieldOfStudy: undefined,
    institutionCity: undefined,
    institutionProvince: undefined,
    gpa: undefined,
    startDate: undefined,
    endDate: undefined,
    currentlyAttending: undefined,
});

const onSubmit = async () => {
    try {
        let user = await educationSchema.validate(formState);
        // TODO: send request to backend. Make sure t
        console.log(user);
    } catch (err) {
        console.error(err);
        console.log(educationSchema);
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
                :ui="{ item: 'mr-5' }"
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
                class="w-full justify-center"
                @click="onSubmit"
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
