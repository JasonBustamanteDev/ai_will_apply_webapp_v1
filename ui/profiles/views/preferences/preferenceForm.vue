<script setup>
import { preferenceSchema } from "../formValidation";
import { booleanOptions, radioStyleObject } from "~/ui/profiles/shared/constants.js"; // prettier-ignore

const props = defineProps({
    data: {
        type: Object,
        required: false,
    },
});

const formState = reactive(
    props.data || {
        // These keys must match the name attributes on UFormField elements
        currentAnnualSalary: 40000,
        expectedAnnualSalary: 60000,
        noticePeriod: 14,
        willingToRelocate: true,
        driversLicense: true,
        reliableTransportation: true,
        veteranStatus: false,
        companyBlacklist: ["Some terrible company"],
    }
);

const onSubmit = async () => {
    try {
        let user = await preferenceSchema.validate(formState);
        // TODO: send request to backend
        console.log(user);
    } catch (err) {
        console.error(err);
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
                :ui="radioStyleObject"
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
                :ui="radioStyleObject"
            />
        </UFormField>
        <UFormField
            label="Do you own a Car? **"
            name="reliableTransportation"
            class="mb-0"
        >
            <URadioGroup
                v-model="formState.reliableTransportation"
                orientation="horizontal"
                variant="list"
                :items="booleanOptions"
                class="mt-2"
                size="xl"
                :ui="radioStyleObject"
            />
        </UFormField>
        <UFormField
            label="Are you a veteran? **"
            name="veteranStatus"
            class="mb-0"
        >
            <URadioGroup
                v-model="formState.veteranStatus"
                orientation="horizontal"
                variant="list"
                :items="booleanOptions"
                class="mt-2"
                size="xl"
                :ui="radioStyleObject"
            />
        </UFormField>
        <UFormField
            label="Avoid applying to these companies:"
            name="companyBlacklist"
            class="mb-0 col-span-4"
        >
            <UInputTags
                v-model="formState.companyBlacklist"
                :max="20"
                class="w-full h-auto mb-12"
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
    grid-template-rows: repeat(2, 80px) auto auto;
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
