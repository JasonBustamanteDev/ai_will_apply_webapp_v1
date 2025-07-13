<script setup>
const props = defineProps({
    profileName: { type: String },
    lastModifiedDate: { type: String },
});
</script>

<template>
    <div class="card bg-base-100 w-full shadow-sm">
        <div class="card-body card-content-custom">
            <h2 class="card-title">{{ props.profileName }}</h2>
            <section>
                <p>Forms completed: 3/8</p>
                <p>Last Modified: {{ props.lastModifiedDate }}</p>
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
</style>
