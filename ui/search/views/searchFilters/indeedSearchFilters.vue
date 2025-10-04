<script setup lang="ts">
import { LINKEDIN_FILTER_OPTIONS } from "~/ui/search/constants/filterOptions/linkedinFilters";
import JobBoardBanner from "@/ui/search/shared/jobBoardBanner.vue";
import type { OptionObject, LinkedInSearchPayload } from "~/ui/search/constants/filterOptions/linkedinFilters"; // prettier-ignore

const props = defineProps({
    profileList: { type: Array<string>, required: true },
});

const emit = defineEmits<{
    fire_up_linkedin_search: [payload: LinkedInSearchPayload];
}>();

const selectedProfileName = ref("");
const jobLocation = ref("");
const jobTitle = ref("");
const datePosted = ref("anytime");
const salary = ref("40000");
const remote = ref(LINKEDIN_FILTER_OPTIONS.REMOTE as OptionObject[]);
const experienceLevel = ref([
    LINKEDIN_FILTER_OPTIONS.EXPERIENCE_LEVEL[1],
] as OptionObject[]);

const indeedThemeColor = "#e58f78"

const rocketHandler = function () {
    emit("fire_up_linkedin_search", {
        profileName: selectedProfileName.value,
        jobLocation: jobLocation.value,
        jobTitle: jobTitle.value,
        datePosted: datePosted.value,
        salary: salary.value,
        experienceLevel: experienceLevel.value,
        remote: remote.value,
    });
};
</script>

<template>
    <JobBoardBanner title="Indeed Auto Apply" :bgColor="indeedThemeColor" />

    <div class="filters_row_1">
        <UFormField label="Job Title">
            <UInput v-model="jobTitle" class="w-full" />
        </UFormField>

        <UFormField label="Job Location">
            <UInput v-model="jobLocation" class="w-full" />
        </UFormField>

        <UFormField label="Applicant Profile">
            <USelect
                v-model="selectedProfileName"
                :items="props.profileList"
                placeholder="Select profile"
                class="w-full"
            />
        </UFormField>
    </div>

    <div class="filters_row_2">
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
    </div>

    <UButton
        label="Auto Apply on LinkedIn"
        color="info"
        trailing-icon="i-lucide-rocket"
        @click="rocketHandler"
        class="w-full justify-center cursor-pointer bg-[#e58f78] hover:!bg-[#e58f78]"
    />
</template>

<style lang="scss">
.filters_row_1 {
    display: grid;
    grid-template-columns: 25% 25% auto;
    gap: 1rem;
    align-items: end;
    margin-bottom: 2rem;
}

.filters_row_2 {
    display: grid;
    grid-template-columns: auto repeat(3, 25%);
    gap: 1rem;
    align-items: end;
    margin-bottom: 2rem;
}
</style>
