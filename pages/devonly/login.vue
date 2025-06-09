<script setup>
import { useCompositionAuthStore } from "@/pinia_stores/auth2";

const authStore = useCompositionAuthStore();
</script>

<template>
    <div>
        <p>Am I online? {{ authStore.readOnly.isAuthenticated }}</p>
        <p>Session data {{ authStore.readOnly.sessionData }}</p>
        <UButton @click="authStore.methods.googleSignIn"
            >Sign In or Sign Up using Google</UButton
        >

        <div></div>
        <UButton @click="authStore.methods.googleSignOut" color="warning"
            >Sign Out</UButton
        >
        <div></div>
        <UButton @click="authStore.methods.googleGetCurrentSession" color="info"
            >Log Existing Session Data</UButton
        >
        <div></div>
        <UButton @click="authStore.methods.googleRefreshSession" color="info"
            >Refresh Session</UButton
        >
    </div>
</template>

<style lang="scss"></style>
