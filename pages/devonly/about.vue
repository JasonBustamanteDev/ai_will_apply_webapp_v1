<script setup>
import { useGlobalStore } from "@/pinia_stores/globalStore";
const config = useRuntimeConfig();

const globalStore = useGlobalStore();
const count = globalStore.count;
const doubleCount = globalStore.doubleCount;

const incrementMethod = () => {
    globalStore.increment();
};
</script>

<template>
    <div>
        <p>{{ config.public.SUPABASE_PROJECT_URL || "nothing" }}</p>
    </div>
</template>
<style lang=""></style>
