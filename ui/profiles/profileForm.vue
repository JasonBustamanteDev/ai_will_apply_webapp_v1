<script setup>
import { object, string, number, date } from "yup";
const MESSAGES = {
    REQUIRED: "This field is requried",
};

const profileSchema = object({
    // PERSONAL INFO
    firstName: string().required(MESSAGES.REQUIRED), //! enforce min length
    lastName: string().required(MESSAGES.REQUIRED), //! enforce min length
    age: number()
        .required("Age is required")
        .min(1, "Age must be at least 1")
        .integer("Age must be a whole number")
        .positive("Age must be a positive number"),
    email: string().email("Invalid email").required("Required"),

    //#region My Custom Section
    // gender
    // phone
    // address
    // city
    // state or province
    // zip code or postal code
    // country
    // portfolio
    // race / ethnicity
    // security clearance

    // SOCIALS
    // linkedin
    // twitter
    // github

    // PREFERENCES
    // current salary
    // expected salary
    // notice period
    // total experience
    // companies to exclude from search
    // willing to relocate
    // driving liscence
    // veteran status

    // cover letter

    // // EDUCATION
    // major
    // college name
    // College city
    // College State
    // time-start
    // time-end
    // gpa

    // // EXTREME
    // skills list
    //#endregion
});

const formState = reactive({
    firstName: undefined,
    lastName: undefined,
    age: undefined,
    email: undefined,
});

const onSubmit = async function () {
    try {
        let user = await profileSchema.validate();
        console.log(user);
    } catch (err) {
        console.log(err);
    }
};
</script>

<template>
    <UForm
        :schema="profileSchema"
        :state="formState"
        class="space-y-4 uform-element"
        @submit="onSubmit"
    >
        <UFormField label="First Name" name="First Name" class="mb-0">
            <UInput v-model="formState.firstName" class="w-full" />
        </UFormField>
        <UFormField label="Last Name" name="Last Name" class="mb-0">
            <UInput v-model="formState.lastName" class="w-full" />
        </UFormField>
        <UFormField label="Age" name="Age" class="mb-0">
            <UInput v-model="formState.age" type="number" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email" class="mb-0">
            <UInput v-model="formState.email" class="w-full" />
        </UFormField>

        <div></div>
        <div></div>

        <UButton type="submit"> Submit </UButton>
    </UForm>
</template>

<style lang="scss" scoped>
.uform-element {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
    margin-top: 1rem;
}
</style>
