<script setup>
import { object, string } from "yup";

const socialSchema = object({
    linkedin: string()
        .nullable()
        .notRequired()
        .test(
            "linkedin-url-or-empty",
            "Enter a valid URL like https://www.linkedin.com/in/john-smith/",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid LinkedIn URL
                return /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
    github: string()
        .nullable()
        .notRequired()
        .test(
            "github-url-or-empty",
            "Enter a valid URL like https://github.com/username",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid GitHub URL
                return /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9\-_]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
    twitter: string()
        .nullable()
        .notRequired()
        .test(
            "twitter-url-or-empty",
            "Enter a valid URL like https://twitter.com/username",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid Twitter or X URL
                return /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    linkedin: undefined,
    github: undefined,
    twitter: undefined,
});

const onSubmit = async function () {
    try {
        let user = await socialSchema.validate(formState);
        // TODO: send request to backend
        console.log(user);
    } catch (err) {
        console.error(err);
        console.log(profileSchema);
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
        <UFormField label="LinkedIn" name="linkedin" class="mb-0 col-span-2">
            <UInput v-model="formState.linkedin" class="w-full" />
        </UFormField>
        <UFormField label="Github" name="github" class="mb-0 col-span-2">
            <UInput v-model="formState.github" class="w-full" />
        </UFormField>
        <UFormField label="Twitter" name="twitter" class="mb-0 col-span-2">
            <UInput v-model="formState.twitter" class="w-full" />
        </UFormField>
    </UForm>
</template>

<style lang="scss" scoped>
.uform-element {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 95px 95px auto; 
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
