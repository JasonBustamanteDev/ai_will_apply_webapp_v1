<script setup>
import PersonalDetailsForm from "~/ui/profiles/personalDetails/personalDetailsForm.vue";
import LocationForm from "~/ui/profiles/location/locationForm.vue";
import EducationForm from "~/ui/profiles/education/educationForm.vue";
import CollapseComponent from "~/ui/profiles/shared/collapse.vue";
import LanguagesForm from "~/ui/profiles/languages/languagesForm.vue";

definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});

// TODO: Dynamically show complete or is not complete based on whether the form is submitted or not
// TODO: Make it so all required forms are submitted (optional ones don't have to be)
// TODO: Have a copy paste feature for profiles.
</script>

<template>
    <div>
        <SharedPageContainerWithNavbar>
            <section class="multiple-forms-container">
                <div>
                    <p>
                        Complete all required forms below to unlock the job
                        search feature
                    </p>
                    <p>
                        All required fields have labels that end with asterisks
                        <span class="font-extrabold">**</span>
                    </p>
                    <p class="font-bold">
                        Do not forget to hit the submit button after filling in
                        a form
                    </p>
                </div>
                <CollapseComponent title="Personal Details" :isComplete="true">
                    <PersonalDetailsForm />
                </CollapseComponent>
                <CollapseComponent title="Location" :isComplete="true">
                    <LocationForm />
                </CollapseComponent>
                <CollapseComponent title="Languages" :isComplete="false">
                    <LanguagesForm />
                </CollapseComponent>
                <CollapseComponent
                    title="University or College"
                    :isComplete="false"
                    :isOptional="true"
                >
                    <EducationForm />
                </CollapseComponent>
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
