<script setup>
import { object, string, number, boolean, array } from "yup";
import { booleanOptions } from "~/ui/profiles/shared/util.js";

const MESSAGES = {
    REQUIRED: "This field is required",
};

const preferenceSchema = object({
    currentAnnualSalary: number().required(MESSAGES.REQUIRED),
    expectedAnnualSalary: number().required(MESSAGES.REQUIRED),
    noticePeriod: number().required(MESSAGES.REQUIRED),
    willingToRelocate: boolean().required(MESSAGES.REQUIRED),
    driversLicense: boolean().required(MESSAGES.REQUIRED),
    reliableTransportation: boolean().required(MESSAGES.REQUIRED),
    veteranStatus: boolean().required(MESSAGES.REQUIRED),
    companyBlacklist: array()
        .of(string().required())
        .min(0)
        .required(MESSAGES.REQUIRED),
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    currentAnnualSalary: 40000,
    expectedAnnualSalary: 60000,
    noticePeriod: 14,
    willingToRelocate: true,
    driversLicense: true,
    reliableTransportation: true,
    veteranStatus: undefined,
    companyBlacklist: ["Some terrible company"],
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
                :step="1"
                class="w-full"
                color="neutral"
            />
        </UFormField>

        <UFormField
            label="Willing to Relocate **"
            name="willingToRelocate"
            class="mb-0"
        >
            <URadioGroup
                v-model="formState.willingToRelocate"
                orientation="horizontal"
                variant="list"
                :items="booleanOptions"
                class="mt-2"
                size="xl"
                :ui="{ item: 'mr-5' }"
            />
        </UFormField>
        <UFormField
            label="Have Driver's Licence **"
            name="driversLicense"
            class="mb-0"
        >
            <URadioGroup
                v-model="formState.driversLicense"
                orientation="horizontal"
                variant="list"
                :items="booleanOptions"
                class="mt-2"
                size="xl"
                :ui="{ item: 'mr-5' }"
            />
        </UFormField>
        <UFormField
            label="Do you have a reliable mode of transportation? **"
            name="reliableTransportation"
            class="mb-0 col-span-2"
        >
            <URadioGroup
                v-model="formState.reliableTransportation"
                orientation="horizontal"
                variant="list"
                :items="booleanOptions"
                class="mt-2"
                size="xl"
                :ui="{ item: 'mr-5' }"
            />
        </UFormField>
        <UFormField
            label="Avoid applying to these companies"
            name="companyBlacklist"
            class="mb-0 col-span-4"
        >
            <UInputTags
                v-model="formState.companyBlacklist"
                class="w-full h-10"
            />
        </UFormField>
    </UForm>
    <p>{{ formState }}</p>
</template>

<style lang="scss" scoped>
.uform-element {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: repeat(3, 80px) auto;
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
