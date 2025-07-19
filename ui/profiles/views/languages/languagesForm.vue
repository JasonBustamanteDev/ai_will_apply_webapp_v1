<script setup>
import AddRowButton from "@/ui/profiles/shared/addRowButton.vue";
import { verifyMinStringLength } from "~/shared/client_helpers";
import { some } from "lodash";

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

const languages = ref(
    props.data || [
        {
            language: "English",
            proficiency: "native",
            langError: false,
            proficiencyError: false,
        },
    ]
);

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
    languages.value.push({
        language: "",
        proficiency: "native",
        langError: false,
        proficiencyError: false,
    });
};

const removeLanguage = (index) => {
    languages.value.splice(index, 1);
};

const onSubmit = () => {
    // tech_debt: ensure this fn validates similarly to this other fn (CTRL F a1b)
    // Check if each field is filled - render error if it isn't and clear errors if it is
    for (const obj of languages.value) {
        const item_lang = obj.language;
        const item_proficiency = obj.proficiency;
        obj.langError = !verifyMinStringLength(item_lang, 1);
        obj.proficiencyError = !verifyMinStringLength(item_proficiency, 1);
    }

    if (some(languages.value, "error")) return;
    console.log("Submit form", languages.value);
};
</script>

<template>
    <div class="flex flex-col gap-3">
        <section>
            <p>
                Enter the full language name. Ex: 'English' (not 'ENG' or other
                abbreviations)
            </p>
            <p>Minimum 1 language required</p>
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
                :color="lang.langError ? 'error' : ''"
            />
            <USelect
                v-model="lang.proficiency"
                :items="proficiencyOptions"
                class="w-36"
                :highlight="lang.proficiencyError"
                :color="lang.proficiencyError ? 'error' : ''"
            />
            <UButton
                icon="i-heroicons-trash"
                color="red"
                variant="ghost"
                @click="removeLanguage(index)"
                :disabled="languages.length === 1"
                class="mb-1"
            />
            <AddRowButton
                v-if="index === languages.length - 1 || languages.length === 1"
                :isDisabled="false"
                @addRow="addLanguage"
                >Add Language</AddRowButton
            >
        </div>
        <div class="uform-submit-button-container mt-7">
            <UButton
                type="submit"
                class="w-full justify-center"
                @click="onSubmit"
                color="secondary"
                >Submit</UButton
            >
        </div>
    </div>
</template>

<style lang="scss"></style>
