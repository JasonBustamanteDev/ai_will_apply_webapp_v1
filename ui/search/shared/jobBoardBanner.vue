<script setup lang="ts">
const props = defineProps({
    title: { type: String, required: true },
    bgColor: { type: String, required: true },
});
</script>
<template>
    <header :style="{ backgroundColor: props.bgColor }" class="rounded-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 mb-10">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-4">
                    <div class="bg-white rounded-lg p-2 shadow-md">
                        <svg
                            :style="{ color: props.bgColor }"
                            class="w-8 h-8"
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
