<script setup>
import { object, string } from "yup";

const socialSchema = object({
    portfolioUrl: string()
        .nullable()
        .notRequired()
        .test(
            "url-or-empty",
            "Enter a valid URL like https://example.com",
            function (value) {
                if (!value || value === "") return true;
                return (
                    /^https?:\/\/.+/.test(value) &&
                    this.createError === undefined
                );
            }
        ),
    linkedin: string()
        .nullable()
        .notRequired()
        .test(
            "linkedin-url-or-empty",
            "Enter a valid URL like linkedin.com/in/john-smith/",
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
            "Enter a valid URL like github.com/username",
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
            "Enter a valid URL like twitter.com/username",
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
    instagram: string()
        .nullable()
        .notRequired()
        .test(
            "instagram-url-or-empty",
            "Enter a valid URL like instagram.com/username",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid Instagram URL
                return /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
    tiktok: string()
        .nullable()
        .notRequired()
        .test(
            "tiktok-url-or-empty",
            "Enter a valid TikTok URL like tiktok.com/@username",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid TikTok URL
                return /^https?:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9._]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
    youtube: string()
        .nullable()
        .notRequired()
        .test(
            "youtube-url-or-empty",
            "Enter a valid YouTube URL like youtube.com/@username",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid YouTube URL
                return /^https?:\/\/(www\.)?youtube\.com\/@[a-zA-Z0-9._-]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
});

const formState = reactive({
    // These keys must match the name attributes on UFormField elements
    portfolioUrl: "",
    linkedin: "",
    github: "",
    twitter: "",
    instagram: "",
    tiktok: "",
    youtube: "",
});

const onSubmit = async () => {
    try {
        let user = await socialSchema.validate(formState);
        // TODO: send request to backend

        // Consider making all starting values an empty string since we need to detect changes
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
            <UInput v-model="formState.linkedin" class="w-full" />
        </UFormField>
        <UFormField label="Github" name="github" class="mb-0 col-span-2">
            <UInput v-model="formState.github" class="w-full" />
        </UFormField>
        <UFormField label="Instagram" name="instagram" class="mb-0 col-span-2">
            <UInput v-model="formState.instagram" class="w-full" />
        </UFormField>
        <UFormField label="Twitter" name="twitter" class="mb-0 col-span-2">
            <UInput v-model="formState.twitter" class="w-full" />
        </UFormField>
        <UFormField label="Tiktok" name="tiktok" class="mb-0 col-span-2">
            <UInput v-model="formState.tiktok" class="w-full" />
        </UFormField>
        <UFormField label="Youtube" name="youtube" class="mb-0 col-span-2">
            <UInput v-model="formState.youtube" class="w-full" />
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
    grid-template-rows: 95px 95px 95px auto;
    gap: 0.5rem 1rem;
}

.uform-submit-button-container {
    grid-column-start: 1;
    grid-column-end: 5;
}
</style>
