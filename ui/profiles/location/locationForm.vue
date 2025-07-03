<script setup>
import { object, string, number } from "yup";
import { countriesList } from "./countries";
import { usaDict, canadaDict } from "./provinces";
import { verifyMinStringLength } from "~/shared/helper_methods";

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
        .nullable()
        .notRequired()
        .test(
            "min-length-no-whitespace",
            "No addresses comprised of empty spaces",
            function (value) {
                if (!value || value === "") return true;
                return verifyMinStringLength(value, 1);
            }
        ),
    city: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty addresses", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    postalCode: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty postal codes", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    provinceState: string()
        .required(MESSAGES.REQUIRED)
        .test(
            "valid-province-or-state",
            "Type the full name of your province/state or the abbreviation (Ex. 'Ontario' or 'ON')",
            function (value) {
                // Verify that the value is in the list of valid provinces/states
                const lowercaseValue = value.toLowerCase();
                const country = this.parent.country;

                if (country === "CA") return lowercaseValue in canadaDict;
                else if (country === "US") return lowercaseValue in usaDict;
                else return verifyMinStringLength(lowercaseValue, 1);
            }
        ),
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    country: undefined,
    address: undefined,
    city: undefined,
    postalCode: undefined,
    provinceState: undefined,
});

watch(
    () => formState.country,
    function (newCountry, oldCountry) {
        formState.provinceState = undefined;
    },
    { immediate: false, deep: true }
);

const onSubmit = async () => {
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
        <UFormField label="Country **" name="country" class="mb-0">
            <USelectMenu
                :key="formState.country"
                v-model="formState.country"
                :items="countriesList"
                value-key="value"
                class="w-full"
            />
        </UFormField>

        <UFormField label="City **" name="city" class="mb-0">
            <UInput v-model="formState.city" class="w-full" />
        </UFormField>
        <UFormField label="Postal Code **" name="postalCode" class="mb-0">
            <UInput v-model="formState.postalCode" class="w-full" />
        </UFormField>
        <UFormField
            label="Province or State or Region **"
            name="provinceState"
            class="mb-0 col-span-2"
        >
            <UInput v-model="formState.provinceState" class="w-full" />
        </UFormField>
        <UFormField label="Address" name="address" class="mb-0 col-span-2">
            <UInput v-model="formState.address" class="w-full" />
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
