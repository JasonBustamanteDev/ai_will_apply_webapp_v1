<script setup>
import { countriesList } from "./countries";
import { locationSchema } from "../formValidation";

const props = defineProps({
    data: {
        type: Object,
        required: false,
    },
    formName: {
        type: String,
        required: true,
    },
    encodedProfileName: {
        type: String,
        required: true,
    },
});

const formState = reactive(
    props.data || {
        // These keys must match the name attributes on UFormField elements
        country: undefined,
        address: undefined,
        city: undefined,
        postalCode: undefined,
        provinceState: undefined,
        citizenship: undefined,
    }
);

// Clear the province field each time the country changes
watch(
    () => formState.country,
    function (newCountry, oldCountry) {
        formState.provinceState = undefined;
    },
    { immediate: false, deep: true }
);

const onSubmit = async () => {
    try {
        let user = await locationSchema.validate(formState);
        // TODO: send request to backend
        console.log(user);
    } catch (err) {
        console.error(err);
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
        <UFormField label="Citizenship **" name="citizenship" class="mb-0">
            <USelectMenu
                :key="formState.citizenship"
                v-model="formState.citizenship"
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
            <UInput
                v-model="formState.provinceState"
                class="w-full"
                placeholder="Example: 'Ontario' or 'ON'"
            />
        </UFormField>
        <UFormField label="Address" name="address" class="mb-0 col-span-2">
            <UInput v-model="formState.address" class="w-full" />
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
    grid-template-rows: 95px 120px auto;
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
