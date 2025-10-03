<script setup lang="ts">
import { LINKEDIN_FILTER_OPTIONS } from "@/ui/search/shared/search_filter_options";
import type { OptionObject, LinkedInSearchPayload } from "@/ui/search/shared/search_filter_options"; // prettier-ignore
import type { hover } from "@testing-library/user-event/dist/cjs/convenience/hover.js";

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
    <header class="bg-[#2596be] shadow-lg rounded-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-10">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="bg-white rounded-lg p-2 shadow-md">
                        <svg
                            class="w-8 h-8 text-[#2596be]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"
                            ></path>
                        </svg>
                    </div>
                    <div>
                        <h1
                            class="text-3xl font-bold text-white tracking-tight"
                        >
                            LinkedIn Auto Apply
                        </h1>
                    </div>
                </div>
                <div class="hidden md:flex items-center space-x-3">
                    <span
                        class="bg-white bg-opacity-30 text-black px-4 py-2 rounded-full text-sm font-bold backdrop-blur-sm"
                    >
                        Beta
                    </span>
                </div>
            </div>
        </div>
    </header>

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
        class="w-full justify-center cursor-pointer bg-[#2596be] hover:!bg-[#1e7a9a]"
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
