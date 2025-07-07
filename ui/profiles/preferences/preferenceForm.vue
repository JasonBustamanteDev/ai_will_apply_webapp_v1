<script setup>
import { object, string, number, boolean } from "yup";
import { verifyMinStringLength } from "~/shared/helper_methods";

// PREFERENCES
// current annual salary (number)
// expected annual salary  (number)
// notice period in days (number)

// total experience (number)
// companies to exclude from search (tags, list of strings)
// willing to relocate (radio yes or no)
// driving liscence (radio yes or no)
// veteran status (radio yes or no)

const MESSAGES = {
    REQUIRED: "This field is required",
};

const preferenceSchema = object({
    currentAnnualSalary: number().required(MESSAGES.REQUIRED),
    expectedAnnualSalary: number().required(MESSAGES.REQUIRED),
    noticePeriod: number().required(MESSAGES.REQUIRED),
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    currentAnnualSalary: undefined,
    expectedAnnualSalary: undefined,
    noticePeriod: undefined,
});

const onSubmit = async () => {};
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
                :defaultValue="30000"
                :step="1000"
                class="w-full"
                color="neutral"
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
                :defaultValue="30000"
                :step="1000"
                class="w-full"
                color="neutral"
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
                :defaultValue="14"
                :step="1"
                class="w-full"
                color="neutral"
            />
        </UFormField>
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
