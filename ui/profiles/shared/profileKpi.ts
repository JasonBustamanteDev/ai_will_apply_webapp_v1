import { extractFormattedDate } from "~/shared/client_helpers";
import { personalDetailsSchema, locationSchema, preferenceSchema, educationSchema, socialSchema, skillsValidator, workExperienceValidator, languageValidator } from "../views/formValidation"; // prettier-ignore

export const calculateProfileKpi = async (x: JobSearchProfilesRow) => {
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
        // Mandatory forms below
        personalDetailsIsValid,
        locationIsValid,
        preferenceIsValid,
        languagesIsValid,
        workExperienceIsValid,
        educationIsValid,

        // Optional forms below
        skillsIsValid,
        mediaIsValid,
    ];
    const completedCount = formCompletionBooleans.filter(Boolean).length;

    // We consider a profile ready if all the required forms are filled in and valid
    // The optional forms do not belong on the following list
    const areMandatoryFormsComplete =
        personalDetailsIsValid &&
        locationIsValid &&
        preferenceIsValid &&
        languagesIsValid &&
        workExperienceIsValid &&
        educationIsValid; // tech_debt: 1ab89 (edit this expression if some forms change between optional and mandatory)

    return {
        profileName: x.profileName,
        lastUpdated: extractFormattedDate(x.updatedAt || x.createdAt),
        isReady: areMandatoryFormsComplete,
        completedFormFraction: `${completedCount}/${formCompletionBooleans.length}`,

        // prettier-ignore (FORM NAMES)
        forms: {
            [PROFILE_FORMS.PERSONAL_DETAILS]: {
                data: x.personalDetails,
                isComplete: personalDetailsIsValid,
            },
            [PROFILE_FORMS.LOCATION]: {
                data: x.location,
                isComplete: locationIsValid,
            },
            [PROFILE_FORMS.PREFERENCES]: {
                data: x.preferences,
                isComplete: preferenceIsValid,
            },
            [PROFILE_FORMS.LANGUAGES]: {
                data: x.languages,
                isComplete: languagesIsValid,
            },
            [PROFILE_FORMS.SKILLS]: {
                data: x.skills,
                isComplete: skillsIsValid,
            },
            [PROFILE_FORMS.WORK_EXPERIENCE]: {
                data: x.workExperience,
                isComplete: workExperienceIsValid,
            },
            [PROFILE_FORMS.EDUCATION]: {
                data: x.education,
                isComplete: educationIsValid,
            },
            [PROFILE_FORMS.MEDIA_LINKS]: {
                data: x.mediaLinks,
                isComplete: mediaIsValid,
            },
        },
    };
};
