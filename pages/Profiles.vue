<script setup>
import PersonalDetailsForm from "~/ui/profiles/personalDetails/personalDetailsForm.vue";
import LocationForm from "~/ui/profiles/location/locationForm.vue";
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
            <CollapseComponent title="Personal Details" :isComplete="true">
                <PersonalDetailsForm />
            </CollapseComponent>
            <CollapseComponent title="Location" :isComplete="false">
                <LocationForm />
            </CollapseComponent>
        </div>
    </div>
</template>
