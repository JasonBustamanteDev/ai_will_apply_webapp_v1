<script setup>
import PersonalDetailsForm from "~/ui/profiles/personalDetails/personalDetails.vue";
import CollapseComponent from "~/ui/profiles/shared/collapse.vue";

definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});

// TODO: Dynamically show complete or is not compelte based on whether the form is submitted or not
</script>

<template>
    <div>
        <SharedNavbar />
        <div class="global-layout-container">
            <CollapseComponent title="Personal Details" :isComplete="false">
                <PersonalDetailsForm />
            </CollapseComponent>
        </div>
    </div>
</template>
