<script setup>
import { useSupabaseAuthStore } from "~/pinia_stores/supabase_auth";

const authStore = useSupabaseAuthStore();
</script>

<template>
    <div>

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
        <p style="word-break: break-all; white-space: pre-wrap;">
            Current Session {{ authStore.state.currentSession }}
        </p>
    </div>
</template>

<style lang="scss"></style>
