``
<script setup>
import { object, string, number } from "yup";
import { countriesList } from "./countries";
import { verifyMinStringLength } from "~/shared/helper_methods";
// LOCATION
// country (list of countries)
// address (mandatory string)
// city (mandatory string)
// zip code or postal code (optional string field)

// state or province (optional list if country is USA or Canada If not, provide a text field)

const MESSAGES = {
    REQUIRED: "This field is required",
};

const locationSchema = object({
    country: string()
        .required(MESSAGES.REQUIRED)
        .oneOf(
            countriesList.map((g) => g.value),
            "Select a valid country"
        ),
    address: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty addresses", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    city: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty addresses", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    postalCode: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty postal codes", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    country: undefined,
    address: undefined,
    city: undefined,
    postalCode: undefined,
    // provinceState: undefined,
});

const onSubmit = async function () {
    try {
        let user = await locationSchema.validate();
        // TODO: send request to backend
        console.log(user);
    } catch (err) {
        console.error(err);
        console.log(locationSchema);
    }
};
</script>

<template>
    <UForm
        :schema="locationSchema"
        :state="formState"
        class="space-y-4 uform-element pt-4"
        @submit="onSubmit"
    >
        <UFormField label="Country" name="country" class="mb-0">
            <USelectMenu
                v-model="formState.country"
                :items="countriesList"
                value-key="value"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Address" name="address" class="mb-0">
            <UInput v-model="formState.address" class="w-full" />
        </UFormField>
        <UFormField label="City" name="city" class="mb-0">
            <UInput v-model="formState.city" class="w-full" />
        </UFormField>
        <UFormField label="Postal Code" name="postalCode" class="mb-0">
            <UInput v-model="formState.postalCode" class="w-full" />
        </UFormField>

        <div class="uform-submit-button-container">
            <UButton
                type="submit"
                class="w-full justify-center"
                @click="onSubmit"
                >Submit</UButton
            >
        </div>
    </UForm>
</template>

<style lang="scss" scoped></style>
``
