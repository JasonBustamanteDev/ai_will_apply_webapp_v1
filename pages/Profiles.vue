<script setup>
import PersonalDetailsForm from "~/ui/profiles/personalDetails/personalDetails.vue";

definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});
</script>

<template>
    <div>
        <SharedNavbar />
        <div class="global-layout-container">
            <PersonalDetailsForm />
        </div>
    </div>
</template>
