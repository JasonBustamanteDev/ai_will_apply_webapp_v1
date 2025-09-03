<script setup lang="ts">
import { countriesList } from "./countries";
import { locationSchema } from "../formValidation";
import { updateProfile } from "~/ui/profiles/apiCalls/updateProfile.js";
import { useCustomToast } from "~/pinia_stores/toast";
import type { LocationRaw } from "~/types/forms/location";

const props = defineProps<{
    rawFormData: LocationRaw;
    formName: string;
    encodedProfileName: string;
}>();

const { showSuccessToast, showErrorToast } = useCustomToast();
const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const formState = reactive(
    props.rawFormData.data || {
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
    let isValidationError = true;
    try {
        // Validate schema
        await locationSchema.validate(formState);
        isValidationError = false;

        // Send backend request to update profile
        await updateProfile(supabaseProjectURL, props.encodedProfileName, {
            [props.formName]: formState,
        });

        // Close collapse component and render success toast
        // @ts-ignore
        document.getElementById(COLLAPSE_NAMES.LOCATION).checked = false;
        showSuccessToast(
            "Form Submitted",
            "Fill out the remaining forms or start job hunting"
        );

        // Update props data to avoid refetching data
        props.rawFormData.isComplete = true;
        props.rawFormData.data = formState;
    } catch (err: any) {
        console.error(err);
        if (!isValidationError) {
            showErrorToast(
                "ERROR: UPDATE LOCATION",
                err?.data?.detail ||
                    err?.message ||
                    "Request to update location failed.",
                true
            );
        }
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
                data-testid="country_field"
            />
        </UFormField>
        <UFormField label="Citizenship **" name="citizenship" class="mb-0">
            <USelectMenu
                :key="formState.citizenship"
                v-model="formState.citizenship"
                :items="countriesList"
                value-key="value"
                class="w-full"
                data-testid="citizenship_field"
            />
        </UFormField>
        <UFormField label="City **" name="city" class="mb-0">
            <UInput
                v-model="formState.city"
                class="w-full"
                data-testid="city_field"
            />
        </UFormField>
        <UFormField label="Postal Code **" name="postalCode" class="mb-0">
            <UInput
                v-model="formState.postalCode"
                class="w-full"
                data-testid="postal_code_field"
            />
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
                data-testid="province_field"
            />
        </UFormField>
        <UFormField label="Address" name="address" class="mb-0 col-span-2">
            <UInput
                v-model="formState.address"
                class="w-full"
                data-testid="address_field"
            />
        </UFormField>

        <div class="uform-submit-button-container">
            <UButton
                type="submit"
                class="w-full justify-center cursor-pointer"
                color="secondary"
                data-testid="location_submit_button"
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
