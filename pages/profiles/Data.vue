<script setup lang="ts">
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
    } catch (err:any) {
        showErrorToast(
            "ERROR: FETCH SINGLE PROFILE",
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
                :checkboxId="COLLAPSE_NAMES.PERSONAL_DETAILS"
                :isComplete="
                    profileDataObject.forms[PROFILE_FORMS.PERSONAL_DETAILS]
                        .isComplete
                "
                :isOptional="!PROFILE_REQUIREMENTS.PERSONAL_DETAILS"
            >
                <PersonalDetailsForm
                    :rawFormData="
                        profileDataObject.forms[PROFILE_FORMS.PERSONAL_DETAILS]
                    "
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.PERSONAL_DETAILS"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Location"
                :checkboxId="COLLAPSE_NAMES.LOCATION"
                :isComplete="
                    profileDataObject.forms[PROFILE_FORMS.LOCATION].isComplete
                "
                :isOptional="!PROFILE_REQUIREMENTS.LOCATION"
            >
                <LocationForm
                    :rawFormData="
                        profileDataObject.forms[PROFILE_FORMS.LOCATION]
                    "
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.LOCATION"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Preferences"
                :checkboxId="COLLAPSE_NAMES.PREFERENCES"
                :isComplete="
                    profileDataObject.forms[PROFILE_FORMS.PREFERENCES]
                        .isComplete
                "
                :isOptional="!PROFILE_REQUIREMENTS.PREFERENCES"
            >
                <PreferenceForm
                    :rawFormData="
                        profileDataObject.forms[PROFILE_FORMS.PREFERENCES]
                    "
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.PREFERENCES"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Languages"
                :checkboxId="COLLAPSE_NAMES.LANGUAGES"
                :isComplete="
                    profileDataObject.forms[PROFILE_FORMS.LANGUAGES].isComplete
                "
                :isOptional="!PROFILE_REQUIREMENTS.LANGUAGES"
            >
                <LanguagesForm
                    :rawFormData="
                        profileDataObject.forms[PROFILE_FORMS.LANGUAGES]
                    "
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.LANGUAGES"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Work Experience"
                :checkboxId="COLLAPSE_NAMES.WORK_EXPERIENCE"
                :isComplete="
                    profileDataObject.forms[PROFILE_FORMS.WORK_EXPERIENCE]
                        .isComplete
                "
                :isOptional="!PROFILE_REQUIREMENTS.WORK_EXPERIENCE"
            >
                <WorkExperienceForm
                    :rawFormData="
                        profileDataObject.forms[PROFILE_FORMS.WORK_EXPERIENCE]
                    "
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.WORK_EXPERIENCE"
                />
            </CollapseComponent>

            <CollapseComponent
                title="University or College"
                :checkboxId="COLLAPSE_NAMES.EDUCATION"
                :isComplete="
                    profileDataObject.forms[PROFILE_FORMS.EDUCATION].isComplete
                "
                :isOptional="!PROFILE_REQUIREMENTS.EDUCATION"
            >
                <EducationForm
                    :rawFormData="
                        profileDataObject.forms[PROFILE_FORMS.EDUCATION]
                    "
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.EDUCATION"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Portfolio + Social Media Links"
                :checkboxId="COLLAPSE_NAMES.MEDIA_LINKS"
                :isComplete="
                    profileDataObject.forms[PROFILE_FORMS.MEDIA_LINKS]
                        .isComplete
                "
                :isOptional="!PROFILE_REQUIREMENTS.MEDIA_LINKS"
            >
                <SocialsForm
                    :rawFormData="
                        profileDataObject.forms[PROFILE_FORMS.MEDIA_LINKS]
                    "
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.MEDIA_LINKS"
                />
            </CollapseComponent>

            <CollapseComponent
                title="Skills"
                :checkboxId="COLLAPSE_NAMES.SKILLS"
                :isComplete="
                    profileDataObject.forms[PROFILE_FORMS.SKILLS].isComplete
                "
                :isOptional="!PROFILE_REQUIREMENTS.SKILLS"
            >
                <SkillsForm
                    :rawFormData="profileDataObject.forms[PROFILE_FORMS.SKILLS]"
                    :encodedProfileName="encodedDynamicProfileName"
                    :formName="PROFILE_FORMS.SKILLS"
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
