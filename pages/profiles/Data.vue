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
const encodedDynamicProfileName = ref("");

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

            <CollapseComponent
                title="Personal Details"
                :isComplete="profileDataObject.forms.personalDetails.isComplete"
            >
                <PersonalDetailsForm
                    :data="profileDataObject.forms.personalDetails.data"
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.PERSONAL_DETAILS"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Location"
                :isComplete="profileDataObject.forms.location.isComplete"
            >
                <LocationForm
                    :data="profileDataObject.forms.location.data"
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.LOCATION"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Preferences"
                :isComplete="profileDataObject.forms.preferences.isComplete"
                :isOptional="false"
            >
                <PreferenceForm
                    :data="profileDataObject.forms.preferences.data"
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.PREFERENCES"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Languages"
                :isComplete="profileDataObject.forms.languages.isComplete"
            >
                <LanguagesForm
                    :data="profileDataObject.forms.languages.data"
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.LANGUAGES"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Skills"
                :isOptional="false"
                :isComplete="profileDataObject.forms.skills.isComplete"
            >
                <SkillsForm
                    :data="profileDataObject.forms.skills.data"
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.SKILLS"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Work Experience"
                :isOptional="true"
                :isComplete="profileDataObject.forms.workExperience.isComplete"
            >
                <WorkExperienceForm
                    :data="profileDataObject.forms.workExperience.data"
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.WORK_EXPERIENCE"
                />
            </CollapseComponent>

            <CollapseComponent
                title="University or College"
                :isOptional="true"
                :isComplete="profileDataObject.forms.education.isComplete"
            >
                <EducationForm
                    :data="profileDataObject.forms.education.data"
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.EDUCATION"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Portfolio + Social Media Links"
                :isOptional="true"
                :isComplete="profileDataObject.forms.mediaLinks.isComplete"
            >
                <SocialsForm
                    :data="profileDataObject.forms.mediaLinks.data"
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.MEDIA_LINKS"
                />
            </CollapseComponent>
        </section>
        <p v-else>Profile name {{ encodedDynamicProfileName }} not found.</p>
    </SharedPageContainerWithNavbar>
</template>

<style lang="scss" scoped>
.multiple-forms-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
