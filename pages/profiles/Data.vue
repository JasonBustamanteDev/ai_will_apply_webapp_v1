<script setup>
import PersonalDetailsForm from "~/ui/profiles/views/personalDetails/personalDetailsForm.vue";
import LocationForm from "~/ui/profiles/views/location/locationForm.vue";
import EducationForm from "~/ui/profiles/views/education/educationForm.vue";
import CollapseComponent from "~/ui/profiles/shared/collapse.vue";
import LanguagesForm from "~/ui/profiles/views/languages/languagesForm.vue";
import SkillsForm from "~/ui/profiles/views/skills/skillsForm.vue";
import SocialsForm from "~/ui/profiles/views/socials/socialsForm.vue";
import PreferenceForm from "~/ui/profiles/views/preferences/preferenceForm.vue";
import WorkExperienceForm from "~/ui/profiles/views/workExperience/workExperienceForm.vue";
import { useCustomToast } from "~/pinia_stores/toast";
import { getSingleProfile } from "~/ui/profiles/apiCalls/getSingleProfile";

definePageMeta({
    middleware: ["redirect-if-no-auth-session-client"],
});

const route = useRoute();
const { showErrorToast } = useCustomToast();
const env_config = useRuntimeConfig();
const supabaseProjectURL = env_config.public.SUPABASE_PROJECT_URL;

const profileDataObject = ref(null);
const encodedDynamicProfileName = ref(""); // is encoded
const decodedDynamicProfileName = computed(() =>
    decodeURI(encodedDynamicProfileName.value)
);

const fetchSingleProfile = async () => {
    try {
        profileDataObject.value = await getSingleProfile(
            supabaseProjectURL,
            encodedDynamicProfileName.value
        );
    } catch (err) {
        "ERROR: FETCH SINGLE PROFILE",
            showErrorToast(
                err?.data?.detail ||
                    err?.message ||
                    "Request to fetch one profile failed.",
                true
            );
    }
};

onMounted(async () => {
    encodedDynamicProfileName.value = route.query?.profileName || "";
    await fetchSingleProfile();
});

// TODO: Dynamically show complete or is not complete based on whether the form is submitted or not
// TODO: Make it so all required forms are submitted (optional ones don't have to be)
// TODO: Have a copy paste feature for profiles.
</script>

<template>
    <SharedPageContainerWithNavbar>
        <section v-if="profileDataObject" class="multiple-forms-container">
            <div>
                <p>
                    Complete all required forms below to unlock the job search
                    feature
                </p>
                <p>
                    All required fields have labels that end with asterisks
                    <span class="font-extrabold">**</span>
                </p>
                <p class="font-bold">
                    Do not forget to hit the submit button after filling in a
                    form
                </p>
            </div>

            <CollapseComponent title="Personal Details" :isComplete="true">
                <PersonalDetailsForm
                    :data="profileDataObject.form.personalDetails.data"
                />
            </CollapseComponent>

            <CollapseComponent title="Location" :isComplete="true">
                <LocationForm :data="profileDataObject.form.location.data" />
            </CollapseComponent>

            <CollapseComponent
                title="Preferences"
                :isComplete="true"
                :isOptional="false"
            >
                <PreferenceForm :data="profileDataObject.form.preferences.data" />
            </CollapseComponent>

            <CollapseComponent title="Languages" :isComplete="false">
                <LanguagesForm :data="profileDataObject.form.languages.data" />
            </CollapseComponent>

            <CollapseComponent
                title="Skills"
                :isComplete="false"
                :isOptional="false"
            >
                <SkillsForm :data="profileDataObject.form.skills.data" />
            </CollapseComponent>

            <CollapseComponent
                title="Work Experience"
                :isComplete="false"
                :isOptional="true"
            >
                <WorkExperienceForm
                    :data="profileDataObject.form.workExperience.data"
                />
            </CollapseComponent>

            <CollapseComponent
                title="University or College"
                :isComplete="false"
                :isOptional="true"
            >
                <EducationForm :data="profileDataObject.form.education.data" />
            </CollapseComponent>

            <CollapseComponent
                title="Portfolio + Social Media Links"
                :isComplete="false"
                :isOptional="true"
            >
                <SocialsForm :data="profileDataObject.form.mediaLinks.data" />
            </CollapseComponent>
        </section>
        <p v-else>Profile name {{ decodedDynamicProfileName }} not found.</p>
    </SharedPageContainerWithNavbar>
</template>

<style lang="scss" scoped>
.multiple-forms-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
