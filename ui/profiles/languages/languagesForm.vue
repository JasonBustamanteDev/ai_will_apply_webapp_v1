<script setup>
import AddLanguageButton from "./subcomponents/addLangButton.vue";
const languages = ref([{ language: "English", proficiency: "native" }]);

const proficiencyOptions = [
    { label: "Native", value: "native" },
    { label: "Fluent", value: "fluent" },
    { label: "Advanced", value: "advanced" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Basic", value: "basic" },
];

// Check if the last language entry is complete
const isLastLanguageComplete = computed(() => {
    if (languages.value.length === 0) return true;

    const lastLanguage = languages.value[languages.value.length - 1];
    return (
        lastLanguage.language.trim() !== "" &&
        lastLanguage.proficiency.trim() !== ""
    );
});

const addLanguage = () => {
    languages.value.push({ language: "", proficiency: "" });
};

const removeLanguage = (index) => {
    languages.value.splice(index, 1);
};

const onSubmit = () => {

};
</script>

<template>
    <div class="flex flex-col gap-3">
        <p>Enter how many languages you can speak, and at what level</p>
        <div
            v-for="(lang, index) in languages"
            :key="index"
            class="flex items-end gap-3"
        >
            <UInput
                v-model="lang.language"
                placeholder="Full language name. Ex. 'English'"
                class="w-64"
                highlight 
                color=""
            />
            <USelect
                v-model="lang.proficiency"
                :items="proficiencyOptions"
                class="w-36"
                highlight 
                color=""
            />
            <UButton
                icon="i-heroicons-trash"
                color="red"
                variant="ghost"
                @click="removeLanguage(index)"
                :disabled="languages.length === 1"
                class="mb-1"
            />
            <AddLanguageButton
                v-if="index === languages.length - 1 || languages.length === 1"
                :isDisabled="!isLastLanguageComplete"
                @addLangToList="addLanguage"
            />
        </div>
        <div class="uform-submit-button-container">
            <UButton
                type="submit"
                class="w-full justify-center"
                @click="onSubmit"
                color="secondary"
                >Submit</UButton
            >
        </div>
    </div>
    <p>{{ languages }}</p>
</template>

<style lang="scss"></style>
