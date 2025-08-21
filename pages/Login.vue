<script setup lang="ts">
import { useSupabaseAuthStore } from "@/pinia_stores/supabase_auth";
import GoogleSvg from "~/ui/svgs/google.vue";

definePageMeta({
    middleware: ["redirect-if-auth-session-exists-client"],
});

const authStore = useSupabaseAuthStore();
</script>

<template>
    <div class="container">
        <div class="form-wrapper">
            <div class="header">
                <div class="icon-container">
                    <UIcon
                        name="mdi:account-supervisor-circle"
                        class="account-icon"
                    />
                </div>
                <h2 class="title">Login or Sign Up Here</h2>
                <p class="subtitle">Please sign in to continue.</p>
            </div>

            <div class="form-section">
                <div>
                    <button
                        @click="authStore.methods.googleSignIn"
                        class="google-button"
                    >
                        <span class="icon-wrapper">
                            <GoogleSvg />
                        </span>
                        Sign in with Google
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

.account-icon {
    width: 2em;
    height: 2em;
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

.opacity-25 {
    opacity: 0.25;
}

.opacity-75 {
    opacity: 0.75;
}
</style>
