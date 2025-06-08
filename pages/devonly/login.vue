<script setup>
import { createClient } from "@supabase/supabase-js";

const env = useRuntimeConfig();
const supabase = createClient(
    env.public.SUPABASE_PROJECT_URL,
    env.public.SUPABASE_PUBLIC_ANON_API_KEY
);

const googleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: "http://localhost:4010/devonly/login",
        },
    });
    console.log(data);
    console.log(error);
};

const googleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
};

const getNewSession = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    const { session, user } = data;
    if (error !== null) {
        // Handle error
        console.error("getNewSession failed", error);
    }
    console.log({
        session,
        user,
    });
};

const getExistingSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (error !== null) {
        // Handle error
        console.error("Auth session failed", error);
    }
    console.log(data);
};
</script>

<template>
    <div>
        <div v-if="!isUserSignedIn">
            <UButton @click="googleSignIn"
                >Sign In or Sign Up using Google</UButton
            >
        </div>
        <!-- <div v-else> -->
            
            <div></div>
            <UButton @click="googleSignOut" color="warning">Sign Out</UButton>
            <div></div>
            <UButton @click="getNewSession" color="info"
                >Refresh Session</UButton
            >
            <UButton @click="getExistingSession" color="info"
                >Log Existing Session Data</UButton
            >
        <!-- </div> -->
    </div>
</template>

<style lang="scss"></style>
