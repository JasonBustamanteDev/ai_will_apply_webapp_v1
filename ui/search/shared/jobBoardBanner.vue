<script setup lang="ts">
const props = defineProps({
    title: { type: String, required: true },
    bgColor: { type: String, required: true },
});
</script>
<template>
    <header :style="{ backgroundColor: props.bgColor }" class="rounded-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-5">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="bg-white rounded-lg p-2 shadow-md">
                        <slot></slot>
                    </div>
                    <div>
                        <h1
                            class="text-3xl font-bold text-white tracking-tight"
                        >
                            {{ props.title }}
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
</template>
