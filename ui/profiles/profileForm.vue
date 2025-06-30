<script setup>
import { object, string, number, date } from "yup";
import { verifyMinStringLength } from "~/shared/helper_methods";
import { genders } from "~/ui/profiles/personalDetails/personalDetails.js";

const MESSAGES = {
    REQUIRED: "This field is required",
};

const profileSchema = object({
    // PERSONAL INFO
    firstName: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty names", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    lastName: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty names", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    age: number()
        .required(MESSAGES.REQUIRED)
        .min(13, "Age must be 13 or higher")
        .integer("Age must be a whole number")
        .positive("Age must be 13 or higher")
        .test("min-age", "Age must be 13 or higher", (value) => value >= 13),
    email: string().email("Invalid email").required(MESSAGES.REQUIRED),
    gender: string()
        .required(MESSAGES.REQUIRED)
        .oneOf(
            genders.map((g) => g.value),
            "Please select a valid gender option"
        ),

    //#region My Custom Section
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
    // These keys must match the name attributes on UFormField elements
    firstName: undefined,
    lastName: undefined,
    age: undefined,
    email: undefined,
    gender: undefined,
});

const onSubmit = async function () {
    try {
        let user = await profileSchema.validate();
        console.log(user);
    } catch (err) {
        console.error(err);
        console.log(profileSchema);
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
        <UFormField label="First Name" name="firstName" class="mb-0">
            <UInput v-model="formState.firstName" class="w-full" />
        </UFormField>
        <UFormField label="Last Name" name="lastName" class="mb-0">
            <UInput v-model="formState.lastName" class="w-full" />
        </UFormField>
        <UFormField label="Age" name="age" class="mb-0">
            <UInput v-model="formState.age" type="number" class="w-full" />
        </UFormField>
        <UFormField label="Email" name="email" class="mb-0">
            <UInput v-model="formState.email" class="w-full" />
        </UFormField>
        <UFormField label="Gender" name="gender" class="mb-0">
            <USelect
                v-model="formState.gender"
                :items="genders"
                class="w-full"
            />
        </UFormField>

        <div></div>
        <div></div>
        <div></div>
        <div></div>

        <UButton type="submit" @click="onSubmit"> Submit </UButton>
    </UForm>
    <p>{{ formState }}</p>
</template>

<style lang="scss" scoped>
@import "../../assets/scss/main.scss";

.uform-element {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 95px 95px 95px 95px;
    gap: 0.5rem 1rem;
    margin-top: $navbar-height + 20px;
}
</style>
