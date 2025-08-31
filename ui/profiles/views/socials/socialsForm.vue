<script setup lang="ts">
import { socialSchema } from "../formValidation";
import { updateProfile } from "~/ui/profiles/apiCalls/updateProfile.js";
import { useCustomToast } from "~/pinia_stores/toast";
import type { SocialsRaw } from "~/types/forms/socials";

const props = defineProps<{
    rawFormData: SocialsRaw;
    formName: string;
    encodedProfileName: string;
}>();

const { showSuccessToast, showErrorToast } = useCustomToast();
const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const formState = reactive(
    props.rawFormData.data || {
        // These keys must match the name attributes on UFormField elements
        portfolioUrl: undefined,
        linkedin: undefined,
        github: undefined,
        twitter: undefined,
        instagram: undefined,
        tiktok: undefined,
        youtube: undefined,
    }
);

const onSubmit = async () => {
    let isValidationError = true;
    try {
        // Validate schema
        await socialSchema.validate(formState);
        isValidationError = false;

        // Send backend request to update profile
        await updateProfile(supabaseProjectURL, props.encodedProfileName, {
            [props.formName]: formState,
        });

        // Close collapse component and render success toast
        // @ts-ignore
        document.getElementById(COLLAPSE_NAMES.MEDIA_LINKS).checked = false; // prettier-ignore
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
                "ERROR: UPDATE SOCIAL MEDIA LINKS",
                err?.data?.detail ||
                    err?.message ||
                    "Request to update social media links failed.",
                true
            );
        }
    }
};
</script>

<template>
    <p>{{ props.rawFormData }}</p>
    <UForm
        :schema="socialSchema"
        :state="formState"
        class="space-y-4 uform-element pt-4"
        @submit="onSubmit"
    >
        <UFormField
            label="Portfolio URL"
            name="portfolioUrl"
            class="mb-0 col-span-2"
        >
            <UInput
                v-model="formState.portfolioUrl"
                class="w-full"
                placeholder="https://example.com"
            />
        </UFormField>
        <UFormField label="LinkedIn" name="linkedin" class="mb-0 col-span-2">
            <UInput
                v-model="formState.linkedin"
                class="w-full"
                placeholder="linkedin.com/in/jason-bustamante"
            />
        </UFormField>
        <UFormField label="Github" name="github" class="mb-0 col-span-2">
            <UInput
                v-model="formState.github"
                class="w-full"
                placeholder="github.com/username"
            />
        </UFormField>
        <UFormField label="Instagram" name="instagram" class="mb-0 col-span-2">
            <UInput
                v-model="formState.instagram"
                class="w-full"
                placeholder="instagram.com/username"
            />
        </UFormField>
        <UFormField label="Twitter" name="twitter" class="mb-0 col-span-2">
            <UInput
                v-model="formState.twitter"
                class="w-full"
                placeholder="x.com/username"
            />
        </UFormField>
        <UFormField label="Tiktok" name="tiktok" class="mb-0 col-span-2">
            <UInput
                v-model="formState.tiktok"
                class="w-full"
                placeholder="tiktok.com/@username"
            />
        </UFormField>
        <UFormField label="Youtube" name="youtube" class="mb-0 col-span-2">
            <UInput
                v-model="formState.youtube"
                class="w-full"
                placeholder="youtube.com/@username"
            />
        </UFormField>
        <div class="uform-submit-button-container">
            <UButton
                type="submit"
                class="w-full justify-center cursor-pointer"
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
    grid-template-rows: 95px 95px 95px 95px auto;
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
