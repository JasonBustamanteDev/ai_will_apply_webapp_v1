<script setup lang="ts">
import AddRowButton from "@/ui/profiles/shared/addRowButton.vue";
import { verifyMinStringLength } from "~/shared/client_helpers";
import { updateProfile } from "~/ui/profiles/apiCalls/updateProfile.js";
import { useCustomToast } from "~/pinia_stores/toast";
import type { SkillsRaw, SkillList } from "~/types/forms/skills"; // prettier-ignore

const props = defineProps<{
    rawFormData: SkillsRaw;
    formName: string;
    encodedProfileName: string;
}>();

const { showSuccessToast, showErrorToast } = useCustomToast();
const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const MIN_YEARS = 1;
const MAX_YEARS = 100;
const defaultYearsOfExperience = ref(2);

const generateEmptyRow = () => ({
    name: "",
    years: defaultYearsOfExperience.value,
    nameError: false,
});

const skills: Ref<SkillList> = ref(
    props?.rawFormData?.data || [generateEmptyRow()]
);

const addSkill = () => {
    skills.value.push(generateEmptyRow());
};
const removeSkill = (index: number) => {
    skills.value.splice(index, 1);
};

const onSubmit = async () => {
    let isValidationError = true;
    try {
        // tech_debt: ensure this fn validates similarly to this other fn (CTRL F a1c)
        for (const obj of skills.value) {
            const skillName = obj.name;
            obj.nameError = !verifyMinStringLength(skillName, 1);
        }

        // Do not submit if any errors are present
        const hasValidationErrors = skills.value.some(
            (skillObj) => skillObj["nameError"]
        );
        if (hasValidationErrors) return;
        isValidationError = false;

        // Send backend request to update profile
        const formattedData = skills.value.map((obj) => ({
            name: obj["name"],
            years: obj["years"],
        }));
        await updateProfile(supabaseProjectURL, props.encodedProfileName, {
            [props.formName]: formattedData,
        });

        // Close collapse component and render success toast
        // @ts-ignore
        document.getElementById(COLLAPSE_NAMES.SKILLS).checked = false;
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
                "ERROR: UPDATE SKILLS",
                err?.data?.detail ||
                    err?.message ||
                    "Request to update skills failed.",
                true
            );
        }
    }
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
                :color="skill.nameError ? 'error' : 'neutral'"
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
                color="neutral"
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
            class="w-full justify-center cursor-pointer"
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
