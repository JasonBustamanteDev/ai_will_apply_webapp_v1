<script setup lang="ts">
import AddRowButton from "@/ui/profiles/shared/addRowButton.vue";
import { verifyMinStringLength } from "~/shared/client_helpers";
import { updateProfile } from "~/ui/profiles/apiCalls/updateProfile.js";
import { useCustomToast } from "~/pinia_stores/toast";
import type { LanguagesFormRawData } from "~/types/forms/languages";

const props = defineProps<{
    rawFormData: LanguagesFormRawData;
    formName: string;
    encodedProfileName: string;
}>();

const { showSuccessToast, showErrorToast } = useCustomToast();
const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const generateEmptyRow = () => ({
    language: "", //  we don't provide a default value because it makes the incomplete chip look strange if 1 valid language is there
    proficiency: "native",
    langError: false,
    proficiencyError: false,
});

const languages = ref(props.rawFormData?.data || [generateEmptyRow()]);

const proficiencyOptions = [
    {
        label: "Native",
        value: "native",
    },
    {
        label: "Fluent",
        value: "fluent",
    },
    {
        label: "Advanced",
        value: "advanced",
    },
    {
        label: "Intermediate",
        value: "intermediate",
    },
    {
        label: "Basic",
        value: "basic",
    },
];

const addLanguage = () => {
    languages.value.push(generateEmptyRow());
};

const removeLanguage = (index: number) => {
    languages.value.splice(index, 1);
};

const onSubmit = async () => {
    let isValidationError = true;
    try {
        // tech_debt: ensure this fn validates similarly to this other fn (CTRL F a1b)
        // Check if each field is filled - render error if it isn't and clear errors if it is
        for (const obj of languages.value) {
            const item_lang = obj.language;
            const item_proficiency = obj.proficiency;
            obj.langError = !verifyMinStringLength(item_lang, 1);
            obj.proficiencyError = !verifyMinStringLength(item_proficiency, 1);
        }

        // Do not submit if any errors are present
        const hasValidationErrors = languages.value.some(
            (langObj) => langObj["langError"] || langObj["proficiencyError"]
        );
        if (hasValidationErrors) return;
        isValidationError = false;

        // Send backend request to update profile
        const formattedData = languages.value.map((obj) => ({
            language: obj["language"],
            proficiency: obj["proficiency"],
        }));
        await updateProfile(supabaseProjectURL, props.encodedProfileName, {
            [props.formName]: formattedData,
        });

        // Close collapse component and render success toast
        // @ts-ignore
        document.getElementById(COLLAPSE_NAMES.LANGUAGES).checked = false;
        showSuccessToast(
            "Form Submitted",
            "Fill out the remaining forms or start job hunting"
        );

        // Update props data to avoid refetching data
        props.rawFormData.isComplete = true; // set chip to true
        props.rawFormData.data = formattedData;
    } catch (err: any) {
        console.error(err);
        if (!isValidationError) {
            showErrorToast(
                "ERROR: UPDATE LANGUAGES",
                err?.data?.detail ||
                    err?.message ||
                    "Request to update languages failed.",
                true
            );
        }
    }
};
</script>

<template>
    <div class="flex flex-col gap-3">
        <section>
            <p>Enter the full language name</p>
            <p>Example: 'English' (not 'ENG' or other abbreviations)</p>
        </section>
        <div
            v-for="(lang, index) in languages"
            :key="index"
            class="flex items-end gap-3"
        >
            <UInput
                v-model="lang.language"
                placeholder="Enter language"
                class="w-64"
                :highlight="lang.langError"
                :color="lang.langError ? 'error' : 'neutral'"
                :name="`lang_field_${index}`"
                :data-testid="`lang_field_${index}`"
            />
            <USelect
                v-model="lang.proficiency"
                :items="proficiencyOptions"
                class="w-36"
                :highlight="lang.proficiencyError"
                :color="lang.proficiencyError ? 'error' : 'neutral'"
                :name="`lang_select_${index}`"
                :data-testid="`lang_select_${index}`"
            />
            <UButton
                icon="i-heroicons-trash"
                color="neutral"
                variant="ghost"
                @click="removeLanguage(index)"
                :disabled="languages.length === 1"
                class="mb-1"
                :name="`lang_trash_icon_${index}`"
                :data-testid="`lang_trash_icon_${index}`"
            />
            <AddRowButton
                v-if="index === languages.length - 1 || languages.length === 1"
                :isDisabled="false"
                @addRow="addLanguage"
                :name="`lang_add_button`"
                :data-testid="`lang_add_button`"
                >Add Language</AddRowButton
            >
        </div>
        <div class="uform-submit-button-container mt-7">
            <UButton
                type="submit"
                class="w-full justify-center cursor-pointer"
                @click="onSubmit"
                color="secondary"
                :data-testid="`lang_submit_button`"
                >Submit</UButton
            >
        </div>
    </div>
</template>

<style lang="scss"></style>
