<script setup>
const props = defineProps({
    profileName: { type: String },
    lastModifiedDate: { type: String },
});
</script>

<template>
    <div class="cursor-pointer card bg-base-100 w-60 shadow-sm">
        <div class="card-body items-center text-center">
            <h2 class="card-title">{{ props.profileName }}</h2>
            <p>Last Modified: {{ props.lastModifiedDate }}</p>
            <div>
                <UButton color="neutral" @click="$emit('editCallback')"
                    >Edit</UButton
                >
                <UButton
                    color="neutral"
                    variant="outline"
                    @click="$emit('deleteCallback')"
                    >Delete</UButton
                >
            </div>
        </div>
    </div>
</template>

<style lang="scss"></style>
