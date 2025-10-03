<script setup lang="ts">
import { LINKEDIN_FILTER_OPTIONS } from "@/ui/search/shared/search_filter_options";

const datePosted = ref("anytime");
const salary = ref("40000");
const experienceLevel = ref([]);
const remote = ref([]);
</script>

<template>
    <div class="filters_row">
        <USelect
            v-model="datePosted"
            :items="LINKEDIN_FILTER_OPTIONS.DATE_POSTED"
        />
        <USelect v-model="salary" :items="LINKEDIN_FILTER_OPTIONS.SALARY" />
        <USelectMenu
            v-model="experienceLevel"
            multiple
            :items="LINKEDIN_FILTER_OPTIONS.EXPERIENCE_LEVEL"
        />
        <USelectMenu
            v-model="remote"
            multiple
            :items="LINKEDIN_FILTER_OPTIONS.REMOTE"
        />
        <UButton label="Start Applying" color="info" trailing-icon="i-lucide-rocket" />
    </div>
</template>

<style lang="scss">
.filters_row {
    display: grid;
    grid-template-columns: 15% 15% 25% 25% auto;
    gap: 1rem;
}
</style>
