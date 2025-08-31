<script setup lang="ts">
import { verifyMinStringLength, isValidNumericString } from "~/shared/client_helpers"; // prettier-ignore
import { booleanOptions, radioStyleObject } from "~/ui/profiles/shared/constants.js"; // prettier-ignore
import { updateProfile } from "~/ui/profiles/apiCalls/updateProfile.js";
import InputLabelSlot from "~/ui/profiles/shared/inputLabelSlot.vue";
import AddRowButton from "@/ui/profiles/shared/addRowButton.vue";
import RemoveRowButton from "~/ui/profiles/shared/removeRowButton.vue";
import { useCustomToast } from "~/pinia_stores/toast";
import type { WorkExperienceRaw, JobExperienceObject } from "~/types/forms/workExperience"; // prettier-ignore

const props = defineProps<{
    rawFormData: WorkExperienceRaw;
    formName: string;
    encodedProfileName: string;
}>();

const { showSuccessToast, showErrorToast } = useCustomToast();
const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const currentlyThereOptions = [
    { label: "I still work here", value: "yes" },
    { label: "I no longer work here", value: "no" },
];
const generateEmptyRow = () =>
    ({
        jobTitle: "",
        company: "",
        years: "", // must be empty string (or else error detection overlooks value)
        currentlyThere: "no",

        jobTitleError: false,
        companyError: false,
        yearsError: false,
        currentlyThereError: false,
    } as JobExperienceObject);

const rawData = props.rawFormData.data;
const workExperienceList = ref(rawData && rawData.length ? rawData : []);

const areAllRowsValid = () => {
    // tech_debt: ensure this fn validates similarly to this other fn (CTRL F a1a)
    // Check if each field is filled - render error if it isn't and clear errors if it is
    for (const obj of workExperienceList.value) {
        obj.jobTitleError = !verifyMinStringLength(obj.jobTitle, 1);
        obj.companyError = !verifyMinStringLength(obj.company, 1);

        const yearsValue = obj.years;

        // Numeric string is saved to DB as a number, and will appear as one on the frontend when the data is loaded
        if (typeof yearsValue === "number") {
            obj.yearsError = yearsValue <= 0;
        }
        // If user types a number in the input field, it will still be a string at first
        if (typeof yearsValue === "string") {
            obj.yearsError  = !yearsValue || !isValidNumericString(yearsValue) || Number(yearsValue) <= 0; // prettier-ignore
        }
    }

    const errorExists = workExperienceList.value.some(
        (item) => item.jobTitleError || item.companyError || item.yearsError
    );

    return !errorExists;
};

const addExperienceRow = () => {
    const rowsAreValid = areAllRowsValid();
    if (!rowsAreValid) return;

    workExperienceList.value.push(generateEmptyRow());
};

const removeExperienceRow = () => {
    if (workExperienceList.value.length) {
        workExperienceList.value.pop();
    }
};

const clearExperience = () => {
    workExperienceList.value = [];
};

const onSubmit = async () => {
    let isValidationError = true;
    try {
        // Validate schema then format the data if it's valid
        const rowsAreValid = areAllRowsValid();
        if (!rowsAreValid) return;
        isValidationError = false;

        // Send backend request to update profile
        const formattedData = workExperienceList.value.map((obj) => ({
            jobTitle: obj["jobTitle"],
            company: obj["company"],
            years: Number(obj["years"]),
            currentlyThere: obj["currentlyThere"],
        }));
        await updateProfile(supabaseProjectURL, props.encodedProfileName, {
            [props.formName]: formattedData,
        });

        // Close collapse component and render success toast
        // @ts-ignore
        document.getElementById(COLLAPSE_NAMES.WORK_EXPERIENCE).checked = false; // prettier-ignore
        showSuccessToast(
            "Form Submitted",
            "Fill out the remaining forms or start job hunting"
        );

        // Update props data to avoid refetching data
        props.rawFormData.isComplete = true; // set chip to true
        props.rawFormData.data = formattedData;
    } catch (err: any) {
        console.error(err);
        if (!isValidationError) {
            showErrorToast(
                "ERROR: UPDATE WORK EXPERIENCE",
                err?.data?.detail ||
                    err?.message ||
                    "Request to update work experience failed.",
                true
            );
        }
    }
};
</script>

<template>
    <section class="mb-6">
        <p>
            Enter the most recent work experiences first, then the older ones
            afterwards
        </p>
        <p>
            This impacts which experience the AI will refer to when answering
            questions
        </p>
    </section>
    <section class="multiple-forms-container mb-6">
        <kbd
            v-if="!workExperienceList || !workExperienceList.length"
            class="kbd kbd-lg h-[35px]"
            >I have no work experience</kbd
        >
        <div
            v-for="(row, index) in workExperienceList"
            :key="index"
            class="experience-list-container"
        >
            <UInput
                v-model="row.jobTitle"
                placeholder=""
                :highlight="row.jobTitleError"
                :color="row.jobTitleError ? 'error' : 'neutral'"
            >
                <InputLabelSlot labelText="Job Title **" />
            </UInput>
            <UInput
                v-model="row.company"
                placeholder=""
                :highlight="row.companyError"
                :color="row.companyError ? 'error' : 'neutral'"
            >
                <InputLabelSlot labelText="Company **" />
            </UInput>
            <UInput
                v-model="row.years"
                class="w-full"
                placeholder="number"
                :highlight="row.yearsError"
                :color="row.yearsError ? 'error' : 'neutral'"
                ><InputLabelSlot labelText="Years **"
            /></UInput>

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
    </section>

    <section class="flex gap-4 mb-8">
        <UButton
            icon="i-heroicons-plus"
            variant="outline"
            color="neutral"
            :disabled="false"
            @click="addExperienceRow"
            class="w-auto px-4"
        >
            Add
        </UButton>
        <UButton
            icon="i-heroicons-minus"
            variant="outline"
            color="neutral"
            @click="removeExperienceRow"
            class="w-auto px-4"
        >
            Remove last
        </UButton>
        <UButton
            icon="akar-icons:cross"
            variant="outline"
            color="neutral"
            @click="clearExperience"
            class="w-auto px-4"
        >
            I have no work experience
        </UButton>
    </section>

    <div class="flex gap-4">
        <UButton
            type="submit"
            class="w-full justify-center cursor-pointer"
            @click="onSubmit"
            color="secondary"
            >Submit</UButton
        >
    </div>
</template>

<style lang="scss">
.experience-list-container {
    display: grid;
    grid-template-columns: 0.8fr 1fr 0.5fr 1.5fr;
    gap: 2rem 1rem;
    width: 100%;
}

.multiple-forms-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}
</style>
