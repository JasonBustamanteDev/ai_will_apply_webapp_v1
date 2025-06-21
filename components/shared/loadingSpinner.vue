<template>
    <div class="loading-spinner" :class="{ [`size-${size}`]: true }">
        <div class="spinner-circle"></div>
    </div>
</template>

<script>
export default {
    name: "LoadingSpinner",
    props: {
        size: {
            type: String,
            default: "medium",
            validator: (value) => ["small", "medium", "large"].includes(value),
        },
        color: {
            type: String,
            default: "#3b82f6",
        },
    },
};
</script>

<style scoped>
.loading-spinner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.spinner-circle {
    border: 3px solid rgba(59, 130, 246, 0.2);
    border-top: 3px solid v-bind(color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.size-small .spinner-circle {
    width: 40px;
    height: 40px;
    border-width: 3px;
}

.size-medium .spinner-circle {
    width: 64px;
    height: 64px;
    border-width: 4px;
}

.size-large .spinner-circle {
    width: 96px;
    height: 96px;
    border-width: 6px;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
