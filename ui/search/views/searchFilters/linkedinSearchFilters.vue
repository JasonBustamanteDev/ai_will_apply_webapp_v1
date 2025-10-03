<script setup lang="ts">
import { LINKEDIN_FILTER_OPTIONS } from "@/ui/search/shared/search_filter_options";
import type { OptionObject, LinkedInSearchPayload } from "@/ui/search/shared/search_filter_options"; // prettier-ignore

const emit = defineEmits<{
    fire_up_linkedin_search: [payload: LinkedInSearchPayload];
}>();

const datePosted = ref("anytime");
const salary = ref("40000");
const remote = ref(LINKEDIN_FILTER_OPTIONS.REMOTE as OptionObject[]);
const experienceLevel = ref([
    LINKEDIN_FILTER_OPTIONS.EXPERIENCE_LEVEL[1],
] as OptionObject[]);

const rocketHandler = function () {
    emit("fire_up_linkedin_search", {
        datePosted: datePosted.value,
        salary: salary.value,
        experienceLevel: experienceLevel.value,
        remote: remote.value,
    });
};
</script>

<template>
    <div class="filters_row">
        <UFormField label="Date Posted">
            <USelect
                v-model="datePosted"
                :items="LINKEDIN_FILTER_OPTIONS.DATE_POSTED"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Salary">
            <USelect
                v-model="salary"
                :items="LINKEDIN_FILTER_OPTIONS.SALARY"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Experience Level">
            <USelectMenu
                v-model="experienceLevel"
                multiple
                :items="LINKEDIN_FILTER_OPTIONS.EXPERIENCE_LEVEL"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Remote / Onsite">
            <USelectMenu
                v-model="remote"
                multiple
                :items="LINKEDIN_FILTER_OPTIONS.REMOTE"
                class="w-full"
            />
        </UFormField>

        <UButton
            label="Auto Apply on LinkedIn"
            color="info"
            trailing-icon="i-lucide-rocket"
            class="h-auto"
            @click="rocketHandler"
        />
    </div>
</template>

<style lang="scss">
.filters_row {
    display: grid;
    grid-template-columns: 15% 15% 20% 22% auto;
    gap: 1rem;
    align-items: end;
}
</style>
