<script setup lang="ts">
import { LINKEDIN_FILTER_OPTIONS } from "~/ui/search/constants/filterOptions/linkedinFilters";
import JobBoardBanner from "@/ui/search/shared/jobBoardBanner.vue";
import LinkedinSvg from "../../shared/linkedinSvg.vue";
import { verifyMinStringLength } from "~/shared/client_helpers";
import type { OptionObject, LinkedInSearchPayload } from "~/ui/search/constants/filterOptions/linkedinFilters"; // prettier-ignore

const props = defineProps({
    profileList: { type: Array<string>, required: true },
});

const emit = defineEmits<{
    fire_up_linkedin_search: [payload: LinkedInSearchPayload];
}>();

const selectedProfileName = ref("Jason");
const jobLocation = ref("Toronto");
const role = ref("Retail associate");

const datePosted = ref(LINKEDIN_FILTER_OPTIONS.DATE_POSTED[0]?.value as string);
const salary = ref(LINKEDIN_FILTER_OPTIONS.SALARY[0]?.value as string);
const remote = ref([LINKEDIN_FILTER_OPTIONS.REMOTE[0]] as OptionObject[]);
const jobType = ref([LINKEDIN_FILTER_OPTIONS.JOB_TYPE[0]] as OptionObject[]);
const experienceLevel = ref([
    LINKEDIN_FILTER_OPTIONS.EXPERIENCE_LEVEL[0],
] as OptionObject[]);

const rocketHandler = function () {
    emit("fire_up_linkedin_search", {
        profileName: selectedProfileName.value,
        jobLocation: jobLocation.value,
        role: role.value,
        datePosted: datePosted.value,
        salary: salary.value,
        experienceLevel: experienceLevel.value,
        remote: remote.value,
        jobType: jobType.value,
    });
};

const isReadyToSubmit = computed(() => {
    const conditions = [
        verifyMinStringLength(role.value, 1),
        verifyMinStringLength(jobLocation.value, 1),
        selectedProfileName.value,
        datePosted.value,
        salary.value,

        remote.value.length,
        experienceLevel.value.length,
        jobType.value.length,
    ];
    return !conditions.some((element) => !element); // any falsys means the config is not fully filled out
});
</script>

<template>
    <section class="mb-12 bg-gray-200 rounded-lg">
        <JobBoardBanner title="LinkedIn Auto Apply" bgColor="#2596be">
            <LinkedinSvg bgColor="#2596be" />
        </JobBoardBanner>
        <div class="p-5">
            <div class="filters_row_1">
                <UFormField label="Role">
                    <UInput v-model="role" class="w-full" />
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
                <UFormField label="Job Type" class="col-span-2">
                    <USelectMenu
                        v-model="jobType"
                        multiple
                        :items="LINKEDIN_FILTER_OPTIONS.JOB_TYPE"
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
                :disabled="!isReadyToSubmit"
                :class="{
                    'w-full justify-center cursor-pointer': true,
                    'bg-[#2596be] hover:!bg-[#1e7a9a]': isReadyToSubmit,
                    '!bg-[#5c5c5a] hover:!bg-[#5c5c5a]': !isReadyToSubmit,
                }"
            />
        </div>
    </section>
</template>

<style lang="scss">
.filters_row_1 {
    display: grid;
    grid-template-columns: 30% 30% 40%;
    gap: 1rem;
    align-items: end;
    margin-bottom: 2rem;
    overflow-x: hidden;
}
</style>
