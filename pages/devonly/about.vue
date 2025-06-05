<script setup>
const config = useRuntimeConfig();
console.log(config);
</script>
<template>
    <div>
        <p>{{ config.public.SUPABASE_PROJECT_URL || "nothing" }}</p>
    </div>
</template>
<style lang=""></style>
