<script setup>
definePageMeta({
    // Redirect to /dashboard session exists in Local Storage
    middleware: ["redirect-if-auth-session-exists-client"],
});

// Reactive state
const loading = ref(false);
const error = ref("");

//! Google Sign-In function (bring back)
const signInWithGoogle = async () => {};
</script>

<template>
    <div class="container">
        <div class="form-wrapper">
            <div class="header">
                <div class="icon-container">
                    <svg
                        class="user-icon"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                    </svg>
                </div>
                <h2 class="title">Sign in to your account</h2>
                <p class="subtitle">
                    Welcome back! Please sign in to continue.
                </p>
            </div>

            <div class="form-section">
                <div>
                    <button
                        @click="signInWithGoogle"
                        :disabled="loading"
                        class="google-button"
                    >
                        <!-- prettier-ignore -->
                        <span class="icon-wrapper">
                            <svg v-if="!loading" class="google-icon" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                            </svg>
                            <svg v-else class="loading-spinner" fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                        {{ loading ? "Signing in..." : "Sign in with Google" }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;
    padding: 3rem 1rem;
}

@media (min-width: 640px) {
    .container {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
    }
}

@media (min-width: 1024px) {
    .container {
        padding-left: 2rem;
        padding-right: 2rem;
    }
}

.form-wrapper {
    max-width: 28rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.header {
    text-align: center;
}

.icon-container {
    margin: 0 auto;
    height: 3rem;
    width: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: #e0e7ff;
}

.user-icon {
    height: 1.5rem;
    width: 1.5rem;
    color: #4f46e5;
}

.title {
    margin-top: 1.5rem;
    text-align: center;
    font-size: 1.875rem;
    font-weight: 800;
    color: #111827;
    line-height: 1.25;
}

.subtitle {
    margin-top: 0.5rem;
    text-align: center;
    font-size: 0.875rem;
    color: #6b7280;
    line-height: 1.25;
}

.form-section {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.google-button {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    font-size: 0.875rem;
    font-weight: 500;
    border-radius: 0.375rem;
    color: #374151;
    background-color: #ffffff;
    transition: background-color 0.2s ease-in-out;
    cursor: pointer;
}

.google-button:hover:not(:disabled) {
    background-color: #f9fafb;
}

.google-button:focus {
    outline: none;
    box-shadow: 0 0 0 2px #f3f4f6, 0 0 0 4px #4f46e5;
}

.google-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.icon-wrapper {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    padding-left: 0.75rem;
}

.google-icon {
    height: 1.25rem;
    width: 1.25rem;
    color: #6b7280;
}

.google-button:hover:not(:disabled) .google-icon {
    color: #9ca3af;
}

.loading-spinner {
    height: 1.25rem;
    width: 1.25rem;
    color: #6b7280;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

.opacity-25 {
    opacity: 0.25;
}

.opacity-75 {
    opacity: 0.75;
}
</style>
