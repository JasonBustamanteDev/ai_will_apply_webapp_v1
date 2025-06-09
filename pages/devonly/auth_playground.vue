<script setup>
import { useSupabaseAuthStore } from "~/pinia_stores/auth";

const authStore = useSupabaseAuthStore();
</script>

<template>
    <div>
        <p>Am I online? {{ authStore.computed.isAuthenticated }}</p>

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
        <p>Current Session {{ authStore.state.currentSession }}</p>
    </div>
</template>

<style lang="scss"></style>
