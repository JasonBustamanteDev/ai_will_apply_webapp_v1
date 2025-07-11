<script setup>
import { object, string, boolean } from "yup";
import { verifyMinStringLength, isValidYearMonth } from "~/shared/helper_methods"; // prettier-ignore
import { booleanOptions, radioStyleObject } from "~/ui/profiles/shared/util.js";
import InputLabelSlot from "~/ui/profiles/shared/inputLabelSlot.vue";

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
        currentlyThereError: false,
    },
]);

const addExperienceRow = () => {
    workExperienceList.value.push({
        jobTitle: "",
        company: "",
        years: 1,
        currentlyThere: false,

        jobTitleError: false,
        companyError: false,
        currentlyThereError: false,
    });
};

const removeExperienceRow = (index) => {
    workExperienceList.value.splice(index, 1);
};

const onSubmit = () => {
    // Check if each field is filled - render error if it isn't and clear errors if it is
    for (const obj of workExperienceList.value) {
        obj.jobTitleError = !verifyMinStringLength(obj.jobTitle, 1);
        obj.companyError = !verifyMinStringLength(obj.company, 1);
    }

    if (
        workExperienceList.value.some(
            (item) => item.jobTitleError || item.companyError
        )
    ) {
        return;
    }
    console.log("Submit form", workExperienceList.value);
};
</script>

<template>
    <!-- <section>

    </section> -->
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
            :min="0"
            :max="120"
            class="w-full"
            color="neutral"
            placeholder="Years"
        />
        <!-- <UInput
            v-model="row.startDate"
            placeholder="YYYY-MM"
            :highlight="row.startDateError"
            :color="row.startDateError ? 'error' : ''"
        >
            <InputLabelSlot labelText="Years" />
        </UInput> -->

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
