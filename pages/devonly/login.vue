<script setup>
import { useAuthStore } from "@/pinia_stores/auth";

const authStore = useAuthStore();
</script>

<template>
    <div>
        <!-- <p>Am I online? {{ authStore.isAuthenticated }}</p> -->
        <!-- <p>User data {{ authStore.userData }}</p> -->
        <p>User data {{ authStore.userAuthData }}</p>
        <UButton @click="authStore.googleSignIn"
            >Sign In or Sign Up using Google</UButton
        >

        <div></div>
        <UButton @click="authStore.googleSignOut" color="warning"
            >Sign Out</UButton
        >
        <div></div>
        <UButton @click="authStore.googleGetCurrentSession" color="info"
            >Log Existing Session Data</UButton
        >
        <div></div>
        <UButton @click="authStore.googleRefreshSession" color="info"
            >Refresh Session</UButton
        >
    </div>
</template>

<style lang="scss"></style>
