<script setup>
const props = defineProps({
    errorCode: {
        type: [String, Number],
        default: "404",
    },
    title: {
        type: String,
        default: "Page not found",
    },
    message: {
        type: String,
        default: "The page you are looking for does not exist.",
    },
    buttonText: {
        type: String,
        default: "Back to home",
    },
    homeRoute: {
        type: String,
        default: "/",
    },
});

const isLoading = ref(false);

const handleBackToHome = async () => {
    await navigateTo(props.homeRoute);
};
</script>

<template>
    <div class="error-page">
        <div class="error-content">
            <div class="error-code">{{ errorCode }}</div>
            <h1 class="error-title">{{ title }}</h1>
            <p class="error-message">{{ message }}</p>
            <button
                @click="handleBackToHome"
                class="back-button"
                :class="{ loading: isLoading }"
                :disabled="isLoading"
            >
                {{ buttonText }}
            </button>
        </div>
    </div>
</template>

<style scoped>
.error-page {
    min-height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f8f9fa;
    padding: 40px 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, sans-serif;
}

.error-content {
    text-align: center;
    max-width: 500px;
    width: 100%;
}

.error-code {
    font-size: 1.5rem;
    font-weight: 600;
    color: #00c896;
    margin-bottom: 1rem;
    letter-spacing: 0.5px;
}

.error-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a202c;
    margin: 0 0 1rem 0;
    line-height: 1.2;
}

.error-message {
    font-size: 1.125rem;
    color: #718096;
    margin: 0 0 2.5rem 0;
    line-height: 1.6;
}

.back-button {
    background-color: #00c896;
    color: white;
    border: none;
    padding: 12px 24px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    min-width: 140px;
    position: relative;
}

.back-button:hover:not(.loading):not(:disabled) {
    background-color: #00b085;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 200, 150, 0.3);
}

.back-button:active:not(.loading):not(:disabled) {
    transform: translateY(0);
}

.back-button:disabled {
    opacity: 0.8;
    cursor: not-allowed;
}

.back-button.loading::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 16px;
    height: 16px;
    margin: -8px 0 0 -8px;
    border: 2px solid transparent;
    border-top-color: white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>
