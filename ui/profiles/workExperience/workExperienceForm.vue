<script setup>
import { object, string, boolean } from "yup";
import { verifyMinStringLength, isValidYearMonth } from "~/shared/helper_methods"; // prettier-ignore
import { booleanOptions, radioStyleObject } from "~/ui/profiles/shared/util.js";
import InputLabelSlot from "~/ui/profiles/shared/inputLabelSlot.vue";
import AddRowButton from "@/ui/profiles/shared/addRowButton.vue";

/*
job title
company
location

start date
end date
currently attending

description 
*/

const MESSAGES = {
    REQUIRED: "This field is required",
    ONLY_EMPTY: "Answer cannot be empty spaces",
};

const currentlyThereOptions = [
    { label: "I still work here", value: true },
    { label: "I no longer work there", value: false },
];

const workExperienceList = ref([
    {
        jobTitle: "",
        company: "",
        years: undefined,
        currentlyThere: false,

        jobTitleError: false,
        companyError: false,
        yearsError: false,
        currentlyThereError: false,
    },
]);

const areAllRowsValid = () => {
    // Check if each field is filled - render error if it isn't and clear errors if it is
    for (const obj of workExperienceList.value) {
        obj.jobTitleError = !verifyMinStringLength(obj.jobTitle, 1);
        obj.companyError = !verifyMinStringLength(obj.company, 1);
        obj.yearsError = !obj.yearsError;
    }

    const errorExists = workExperienceList.value.some(
        (item) => item.jobTitleError || item.companyError || item.yearsError
    );

    return !errorExists;
};

const addExperienceRow = () => {
    const rowsAreValid = areAllRowsValid();
    if (!rowsAreValid) return;

    workExperienceList.value.push({
        jobTitle: "",
        company: "",
        years: undefined,
        currentlyThere: false,

        jobTitleError: false,
        companyError: false,
        yearsError: false,
        currentlyThereError: false,
    });
};

const removeExperienceRow = (index) => {
    workExperienceList.value.splice(index, 1);
};

const onSubmit = () => {
    const rowsAreValid = areAllRowsValid();
    if (!rowsAreValid) return;
    console.log("Submit form", workExperienceList.value);
};
</script>

<template>
    <section class="multiple-forms-container">
        <div
            v-for="(row, index) in workExperienceList"
            :key="index"
            class="uform-element"
        >
            <UInput
                v-model="row.jobTitle"
                placeholder=""
                :highlight="row.jobTitleError"
                :color="row.jobTitleError ? 'error' : ''"
            >
                <InputLabelSlot labelText="Job Title" />
            </UInput>
            <UInput
                v-model="row.company"
                placeholder=""
                :highlight="row.companyError"
                :color="row.companyError ? 'error' : ''"
            >
                <InputLabelSlot labelText="Company" />
            </UInput>
            <UInputNumber
                v-model="row.years"
                :min="1"
                :max="120"
                class="w-full"
                placeholder="Years"
                :highlight="row.yearsError"
                :color="row.yearsError ? 'error' : 'neutral'"
            />

            <URadioGroup
                v-model="row.currentlyThere"
                orientation="horizontal"
                variant="list"
                :items="currentlyThereOptions"
                size="lg"
                :ui="radioStyleObject"
                class="my-auto"
            />
        </div>
        <p>{{ workExperienceList }}</p>
    </section>

    <AddRowButton :isDisabled="false" @addRow="addExperienceRow"
        >Add Experience</AddRowButton
    >
    <AddRowButton :isDisabled="false" @addRow="removeExperienceRow"
        >Remove Experience</AddRowButton
    >

    <div class="uform-submit-button-container">
        <UButton
            type="submit"
            class="w-full justify-center"
            @click="onSubmit"
            color="secondary"
            >Submit</UButton
        >
    </div>
</template>

<style lang="scss">
.uform-element {
    display: grid;
    grid-template-columns: 1fr 1fr 0.5fr 1.5fr;
    // grid-template-rows: repeat(2, 80px) auto auto;
    gap: 1rem;
    width: 100%;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
