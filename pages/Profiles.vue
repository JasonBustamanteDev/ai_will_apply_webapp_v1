<script setup>
import ProfileForm from "~/ui/profiles/profileForm.vue";

definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});
</script>

<template>
    <div>
        <SharedNavbar />
        <div class="global-layout-container">
            <ProfileForm />
        </div>
    </div>
</template>
