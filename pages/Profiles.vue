<script setup>
import PersonalDetailsForm from "~/ui/profiles/personalDetails/personalDetailsForm.vue";
import LocationForm from "~/ui/profiles/location/locationForm.vue";
import EducationForm from "~/ui/profiles/education/educationForm.vue";
import CollapseComponent from "~/ui/profiles/shared/collapse.vue";

definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});

// TODO: Dynamically show complete or is not complete based on whether the form is submitted or not
// TODO: Make it so all required forms are submitted (optional ones don't have to be)
</script>

<template>
    <div>
        <SharedPageContainerWithNavbar>
            <section class="multiple-forms-container">
                <div>
                    <p>
                        Complete all required forms below to unlock the job search
                        feature
                    </p>
                    <p>
                        All required fields have labels that end with asterisks <span class="font-extrabold">**</span>
                    </p>
                </div>
                <CollapseComponent title="Personal Details" :isComplete="true">
                    <PersonalDetailsForm />
                </CollapseComponent>
                <CollapseComponent title="Location" :isComplete="true">
                    <LocationForm />
                </CollapseComponent>
                <EducationForm/>
            </section>
        </SharedPageContainerWithNavbar>
    </div>
</template>

<style lang="scss" scoped>
.multiple-forms-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
