<script setup>
const props = defineProps({
    profileName: { type: String },
    lastModifiedDate: { type: String },
    completionFraction: { type: String },
    isReady: { type: Boolean },
});
</script>

<template>
    <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body card-content-custom">
            <h2 class="card-header text-lg">{{ props.profileName }}</h2>
            <section>
                <p class="text-sm">
                    Last Modified: {{ props.lastModifiedDate }}
                </p>
                <p class="text-sm">
                    Forms completed: {{ props.completionFraction }}
                </p>
                <p v-if="!isReady" class="text-sm font-bold">
                    {{ "Incomplete ❌" }}
                </p>
                <p v-else class="text-sm">
                    {{ "Ready for use ✅" }}
                </p>
            </section>
            <section class="flex gap-4">
                <UButton
                    color="neutral"
                    @click="$emit('editCallback')"
                    class="cursor-pointer"
                    >Edit</UButton
                >
                <UButton
                    color="neutral"
                    variant="outline"
                    @click="$emit('deleteCallback')"
                    class="cursor-pointer"
                    >Delete</UButton
                >
            </section>
        </div>
    </div>
</template>

<style lang="scss">
.card-content-custom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.card-header {
    font-size: 1.25rem;
    font-weight: 600;
    // min-height:0;
    // min-width: 0;
}
</style>
