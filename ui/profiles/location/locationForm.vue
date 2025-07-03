<script setup>
import { object, string, number } from "yup";
import { countriesList } from "./countries";
// LOCATION
// country (list of countries)
// address (mandatory string)
// city (mandatory string)
// state or province (optional list if country is USA or Canada If not, provide a text field)
// zip code or postal code (optional string field)

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
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    country: undefined,
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
    </UForm>
</template>

<style lang="scss" scoped></style>
