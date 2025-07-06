<script setup>
const languages = ref([{ language: "English", proficiency: "native" }]);

const proficiencyOptions = [
    { label: "Native", value: "native" },
    { label: "Fluent", value: "fluent" },
    { label: "Advanced", value: "advanced" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Basic", value: "basic" },
];

const addLanguage = () => {
    languages.value.push({ language: "", proficiency: "" });
};

const removeLanguage = (index) => {
    languages.value.splice(index, 1);
};
</script>

<template>
    <div
        v-for="(lang, index) in languages"
        :key="index"
        class="flex items-end gap-3"
    >
        <UInput
            v-model="lang.language"
            placeholder="Full language name. Ex. 'English'"
            class="w-64"
        />
        <USelect
            v-model="lang.proficiency"
            :items="proficiencyOptions"
            class="w-36"
        />
        <UButton
            icon="i-heroicons-trash"
            color="red"
            variant="ghost"
            @click="removeLanguage(index)"
            class="mb-1"
        />
    </div>
    <UButton
        icon="i-heroicons-plus"
        variant="outline"
        color="neutral"
        @click="addLanguage"
        class="w-48"
    >
        Add Language
    </UButton>
    <p>{{ languages }}</p>
</template>
