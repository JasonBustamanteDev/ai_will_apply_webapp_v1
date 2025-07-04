<script setup>
import { object, string } from "yup";
import { emptyOrMinLengthStringAccepted } from "~/shared/helper_methods";

// EDUCATION (everything is optional)
// institution (non empty string)
// major (non empty string)
// highest level of education (non empty string)
// college name
// College city
// College State
// time-start
// time-end
// gpa

// TODO: Submit better contain a changed value
const MESSAGES = {
    ONLY_EMPTY: "Answer must not only consist of empty spaces",
};

const educationSchema = object({
    institution: string()
        .nullable()
        .notRequired()
        .test("major", MESSAGES.ONLY_EMPTY, (value) =>
            emptyOrMinLengthStringAccepted(value, 1)
        ),
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    institution: undefined,

    college: undefined,
    collegeCity: undefined,
    collegeState: undefined,
    gpa: undefined,
    startDate: undefined,
    endDate: undefined,
    highestLevelOfEducation: undefined
});

const onSubmit = async () => {
    try {
        let user = await educationSchema.validate();
        // TODO: send request to backend
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
        <UFormField label="Major **" name="major" class="mb-0">
            <UInput v-model="formState.major" class="w-full" />
        </UFormField>
    </UForm>
</template>

<style lang="scss" scoped>
.uform-element {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 95px 120px auto;
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
