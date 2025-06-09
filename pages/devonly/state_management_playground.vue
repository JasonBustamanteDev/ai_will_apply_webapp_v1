<script setup>
import { useGlobalStore } from "@/pinia_stores/globalStore";
const config = useRuntimeConfig();

const globalStore = useGlobalStore();
const count = globalStore.count;
const doubleCount = globalStore.doubleCount;

const incrementMethod = () => {
    globalStore.increment();
};

const supaBaseLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: "https://example.com/welcome",
        },
    });
};
</script>

<template>
    <div>
        <p>{{ config.public.SUPABASE_PROJECT_URL || "nothing" }}</p>
        <button>Press to log in</button>
    </div>
</template>
<style lang=""></style>
