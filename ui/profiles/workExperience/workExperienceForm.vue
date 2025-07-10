<script setup>
import { object, string, boolean } from "yup";
import { verifyMinStringLength, isValidYearMonth } from "~/shared/helper_methods"; // prettier-ignore
import { booleanOptions, radioStyleObject } from "~/ui/profiles/shared/util.js";

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

// const workExperienceSchema = object({
//     jobTitle: string()
//         .required(MESSAGES.REQUIRED)
//         .test("job-title", MESSAGES.ONLY_EMPTY, (value) =>
//             emptyOrMinLengthStringAccepted(value, 1)
//         ),
//     location: string()
//         .required(MESSAGES.REQUIRED)
//         .test("job-location", MESSAGES.ONLY_EMPTY, (value) =>
//             emptyOrMinLengthStringAccepted(value, 1)
//         ),
//     startDate: string()
//         .required(MESSAGES.REQUIRED)
//         .test("start-date", "YYYY-MM format required", (value) => {
//             return isValidYearMonth(value);
//         }),
//     endDate: string()
//         .required(MESSAGES.REQUIRED)
//         .test("start-date", "YYYY-MM format required", (value) => {
//             return isValidYearMonth(value);
//         }),
//     currentlyWorkingThere: boolean().required(MESSAGES.REQUIRED),
// });

const workExperienceList = ref([
    {
        jobTitle: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorkingThere: false,

        jobTitleError: false,
        locationError: false,
        startDateError: false,
        endDateError: false,
        currentlyWorkingThereError: false,
    },
 ]);

const addExperienceRow = () => {
    workExperienceList.value.push({
        jobTitle: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorkingThere: false,

        jobTitleError: false,
        locationError: false,
        startDateError: false,
        endDateError: false,
        currentlyWorkingThereError: false,
    });
};

const removeExperienceRow = (index) => {
    workExperienceList.value.splice(index, 1);
};

const onSubmit = () => {
    // Check if each field is filled - render error if it isn't and clear errors if it is
    for (const obj of languages.value) {
        obj.jobTitleError = !verifyMinStringLength(obj.jobTitle, 1);
        obj.locationError = !verifyMinStringLength(obj.location, 1);
        obj.startDateError = !isValidYearMonth(obj.startDate);
        obj.endDateError = !isValidYearMonth(obj.endDate);
        obj.currentlyWorkingThereError =
            obj.currentlyWorkingThere === false ||
            obj.currentlyWorkingThere === true;
    }

    if (
        workExperienceList.value.some(
            (item) =>
                item.jobTitleError ||
                item.locationError ||
                item.startDateError ||
                item.endDateError ||
                item.currentlyWorkingThereError
        )
    ) {
        return;
    }
    console.log("Submit form", workExperienceList.value);
};
</script>

<template>
    <div
        v-for="(row, index) in workExperienceList"
        :key="index"
        class="flex items-end gap-3"
    >
        <UInput
            v-model="row.jobTitle"
            placeholder=""
            class="w-64"
            :highlight="row.jobTitleError"
            :color="row.jobTitleError ? 'error' : ''"
        />
        <UInput
            v-model="row.location"
            placeholder=""
            class="w-64"
            :highlight="row.locationError"
            :color="row.locationError ? 'error' : ''"
        />
        <UInput
            v-model="row.startDate"
            placeholder=""
            class="w-64"
            :highlight="row.startDateError"
            :color="row.startDateError ? 'error' : ''"
        />
        <UInput
            v-model="row.endDate"
            placeholder=""
            class="w-64"
            :highlight="row.endDateError"
            :color="row.endDateError ? 'error' : ''"
        />
        <URadioGroup
            v-model="row.currentlyWorkingThere"
            orientation="horizontal"
            variant="list"
            :items="booleanOptions"
            class="mt-2"
            size="xl"
            :ui="radioStyleObject"
        />
    </div>
</template>

<style lang="scss"></style>
