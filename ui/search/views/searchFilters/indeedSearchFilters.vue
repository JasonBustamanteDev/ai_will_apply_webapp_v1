<script setup lang="ts">
import { INDEED_FILTER_OPTIONS } from "~/ui/search/constants/filterOptions/indeedFilters";
import JobBoardBanner from "@/ui/search/shared/jobBoardBanner.vue";
import type { IndeedSearchPayload, OptionObject } from "~/ui/search/constants/filterOptions/indeedFilters"; // prettier-ignore

const props = defineProps({
    profileList: { type: Array<string>, required: true },
});

const emit = defineEmits<{
    fire_up_indeed_search: [payload: IndeedSearchPayload];
}>();

const selectedProfileName = ref("");
const role = ref("");
const jobLocation = ref("");

const datePosted = ref(INDEED_FILTER_OPTIONS.DATE_POSTED[0]?.value as string);
const remote = ref(INDEED_FILTER_OPTIONS.REMOTE[0]?.value as string);
const distance = ref(
    (INDEED_FILTER_OPTIONS.DISTANCE.at(-1)?.value || "") as string
);
const jobType = ref([INDEED_FILTER_OPTIONS.JOB_TYPE[0]] as OptionObject[]);

const indeedThemeColor = "#e58f78";

const rocketHandler = function () {
    emit("fire_up_indeed_search", {
        profileName: selectedProfileName.value,
        jobLocation: jobLocation.value,
        role: role.value,

        datePosted: datePosted.value,
        remote: remote.value,
        distance: distance.value,
        jobType: jobType.value,
    });
};
</script>

<template>
    <JobBoardBanner title="Indeed Auto Apply" :bgColor="indeedThemeColor" />

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
    </div>

    <div class="filters_row_2">
        <UFormField label="Date Posted">
            <USelect
                v-model="datePosted"
                :items="INDEED_FILTER_OPTIONS.DATE_POSTED"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Remote / Onsite">
            <USelect
                v-model="remote"
                :items="INDEED_FILTER_OPTIONS.REMOTE"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Distance">
            <USelect
                v-model="distance"
                :items="INDEED_FILTER_OPTIONS.DISTANCE"
                class="w-full"
            />
        </UFormField>
        <UFormField label="Job Type">
            <USelectMenu
                v-model="jobType"
                multiple
                :items="INDEED_FILTER_OPTIONS.JOB_TYPE"
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
