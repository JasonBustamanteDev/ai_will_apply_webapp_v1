<script setup>
import AddRowButton from "@/ui/profiles/shared/addRowButton.vue";
import { verifyMinStringLength } from "~/shared/client_helpers";
import { some } from "lodash";

const MIN_YEARS = 1;
const MAX_YEARS = 100;

const defaultYearsOfExperience = ref(2);
const skills = ref([
    { name: "", years: defaultYearsOfExperience.value, nameError: false },
]);

const addSkill = () => {
    skills.value.push({
        name: "",
        years: defaultYearsOfExperience.value,
        nameError: false,
    });
};
const removeSkill = (index) => {
    skills.value.splice(index, 1);
};

const onSubmit = async () => {
    // tech_debt: ensure this fn validates similarly to this other fn (CTRL F a1c)
    for (const obj of skills.value) {
        const skillName = obj.name;
        obj.nameError = !verifyMinStringLength(skillName, 1);
    }

    if (some(skills.value, "nameError")) return;

    console.log("Submit form", skills.value);
};
</script>

<template>
    <section class="multiple-forms-container">
        <div>
            <span class="mr-6">Default years of experience</span>
            <UInputNumber
                v-model="defaultYearsOfExperience"
                :min="MIN_YEARS"
                :max="MAX_YEARS"
                class="w-36"
                color="neutral"
            />
        </div>
        <div
            v-for="(skill, index) in skills"
            :key="index"
            class="flex items-end gap-3"
        >
            <UInput
                v-model="skill.name"
                :highlight="skill.nameError"
                :color="skill.nameError ? 'error' : ''"
                placeholder="Type skill"
                class="w-64"
            />
            <UInputNumber
                v-model="skill.years"
                :min="MIN_YEARS"
                :max="MAX_YEARS"
                class="w-36"
                color="neutral"
            />
            <UButton
                icon="i-heroicons-trash"
                color="red"
                variant="ghost"
                @click="removeSkill(index)"
                :disabled="skills.length === 1"
                class="mb-1"
            />
            <AddRowButton
                v-if="index === skills.length - 1 || skills.length === 1"
                :isDisabled="false"
                @addRow="addSkill"
                >Add Skill</AddRowButton
            >
        </div>
    </section>
    <div class="uform-submit-button-container mt-7">
        <UButton
            type="submit"
            class="w-full justify-center"
            @click="onSubmit"
            color="secondary"
            >Submit</UButton
        >
    </div>
</template>

<style lang="scss" scoped>
.multiple-forms-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
