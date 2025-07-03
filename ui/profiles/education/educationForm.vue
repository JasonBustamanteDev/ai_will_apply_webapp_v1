<script setup>
import { object, string, number } from "yup";
import { emptyOrMinLengthStringAccepted } from "~/shared/helper_methods";

// EDUCATION (everything is optional)
// major (non empty string)
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
    major: string()
        .nullable()
        .notRequired()
        .test("major", MESSAGES.ONLY_EMPTY, (value) => {
            return emptyOrMinLengthStringAccepted(value, 1);
        }),
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    major: undefined,
    college: undefined,
    collegeCity: undefined,
    collegeState: undefined,
    gpa: undefined,
    startDate: undefined,
    endDate: undefined,
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
    ></UForm>
</template>

<style lang="scss" scoped></style>
