<script setup>
import { socialSchema } from "../formValidation";
import { updateProfile } from "~/ui/profiles/apiCalls/updateProfile.js";

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

const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const formState = reactive(
    props.data || {
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
    try {
        let user = await socialSchema.validate(formState);
        // TODO: send request to backend

        console.log(user);
    } catch (err) {
        console.error(err);
        console.log(socialSchema);
    }
};
</script>

<template>
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
    grid-template-rows: 95px 95px 95px 95px auto;
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
