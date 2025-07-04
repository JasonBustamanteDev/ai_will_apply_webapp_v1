<script setup>
import { object, string } from "yup";
import { emptyOrMinLengthStringAccepted } from "~/shared/helper_methods";

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
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    institutionName: undefined,
    fieldOfStudy: undefined,
    institutionCity: undefined,
    institutionProvince: undefined,

    // gpa: undefined,
    // startDate: undefined,
    // endDate: undefined,
});

const onSubmit = async () => {
    try {
        let user = await educationSchema.validate();
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
        <UFormField label="Institution City **" name="institutionCity" class="mb-0">
            <UInput v-model="formState.institutionCity" class="w-full" />
        </UFormField>
        <UFormField label="Institution Province or State **" name="institutionProvince" class="mb-0">
            <UInput v-model="formState.institutionProvince" class="w-full" />
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
