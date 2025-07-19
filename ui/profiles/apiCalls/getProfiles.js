import { getAuthSessionFromLocalStorage, extractFormattedDate } from "~/shared/client_helpers"; // prettier-ignore
import { personalDetailsSchema, locationSchema, preferenceSchema, educationSchema, socialSchema, skillsValidator, workExperienceValidator, languageValidator } from "../views/formValidation"; // prettier-ignore

export const getProfiles = async (supabaseProjectUrl) => {
    const session = await getAuthSessionFromLocalStorage(supabaseProjectUrl);
    const result = await $fetch("/api/profiles/read/all", {
        headers: {
            Authorization: `Bearer ${session.access_token}`,
        },
    });

    return await formatData(result.data);
};

const formatData = async (profileList) => {
    const rowPromises = profileList.map(async (x) => {
        // Determine if the data saved for each form is valid or not (according to yup schema)
        const personalDetailsIsValid = await personalDetailsSchema.validate(x.personalDetails).then(() => true).catch(() => false); // prettier-ignore
        const locationIsValid = await locationSchema.validate(x.location).then(() => true).catch(() => false); // prettier-ignore
        const preferenceIsValid = await preferenceSchema.validate(x.preferences).then(() => true).catch(() => false); // prettier-ignore
        const educationIsValid = await educationSchema.validate(x.education).then(() => true).catch(() => false); // prettier-ignore
        const mediaIsValid = await socialSchema.validate(x.mediaLinks).then(() => true).catch(() => false); // prettier-ignore

        // Check the custom validation for the unspecified-length list forms
        const languagesIsValid = languageValidator(x.languages);
        const skillsIsValid = skillsValidator(x.skills);
        const workExperienceIsValid = workExperienceValidator(x.workExperience);

        // Count how many forms are complete out of all of them
        const formCompletionBooleans = [
            personalDetailsIsValid,
            locationIsValid,
            preferenceIsValid,
            educationIsValid,
            mediaIsValid,
            languagesIsValid,
            skillsIsValid,
            workExperienceIsValid,
        ];
        const completedCount = formCompletionBooleans.filter(Boolean).length;

        // We consider a profile ready if all the required forms are filled in and valid
        // The optional forms do not belong on the following list
        const areMandatoryFormsComplete =
            personalDetailsIsValid &&
            locationIsValid &&
            preferenceIsValid &&
            languagesIsValid &&
            skillsIsValid

        return {
            profileName: x.profileName,
            lastUpdated: extractFormattedDate(x.updatedAt || x.createdAt),
            isReady: areMandatoryFormsComplete,
            completedFormFraction: `${completedCount}/${formCompletionBooleans.length}`,

            // prettier-ignore (FORM NAMES)
            forms: {
                personalDetails: { data: x.personalDetails, isComplete: personalDetailsIsValid },
                location: { data: x.location, isComplete: locationIsValid },
                preferences: { data: x.preferences, isComplete: preferenceIsValid },

                languages: { data: x.languages, isComplete: languagesIsValid },
                skills: { data: x.skills, isComplete: skillsIsValid },
                workExperience: { data: x.workExperience, isComplete: workExperienceIsValid },

                education: { data: x.education, isComplete: educationIsValid },
                mediaLinks: { data: x.mediaLinks, isComplete: mediaIsValid },
            },
        };
    });

    return await Promise.all(rowPromises);
};
