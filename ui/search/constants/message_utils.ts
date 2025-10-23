import { get, cloneDeep } from "lodash";
import type { SingleProfileType } from "~/ui/profiles/apiCalls/getProfiles";

export const formatMessageForExtension = (
    description: string,
    data: Object
) => {
    return {
        description,
        data,
    };
};

export const flattenFormData = (data: SingleProfileType) => {
    const formData = get(data, ["forms"]);
    const output = {};

    for (const formName in formData) {
        // @ts-expect-error
        if (!formData[formName]["isComplete"]) continue;

        // @ts-expect-error
        const rawData = formData[formName]["data"];

        switch (formName) {
            // Flattening logic is different for list forms with a dynamic length (ex. Languages. People can know 1 or 3)
            case PROFILE_FORMS.LANGUAGES:
                Object.assign(output, { languages: rawData });
                break;
            case PROFILE_FORMS.WORK_EXPERIENCE:
                Object.assign(output, { workExperience: rawData });
                break;
            case PROFILE_FORMS.SKILLS:
                Object.assign(output, { skills: rawData });
                break;
            // Flattening logic for forms with static length
            default:
                Object.assign(output, rawData);
                break;
        }
    }

    return output;
};

export function recycleFormData(formData: Object) {
    // Ex. 'firstName' field's value will be used by 'first name' as well
    // NOTE: In the extension we convert all questions to lowercase - so all our equivalent strings will be in lowercase as well
    const clonedFormData = cloneDeep(formData);
    const equivalentPairs = {
        firstName: ["first name"],
        lastName: ["last name"],
        age: [],
        yearsOfExperience: ["years experience", "years of experience"],
        email: [],
        gender: ["sexual identity", "identify as"],
        phoneNumber: ["phone number", "mobile phone number", "cell number", "cell phone number"],
        ethnicity: [],
        securityClearance: ["security clearance"],
        disability: [],
        educationLevel: ["education", "education level"],
        country: ["nation of birth"],
        address: ["home address"],
        city: ["town"],
        postalCode: ["postal code"],
        provinceState: [
            "province",
            "state",
            "province/state",
            "province / state",
            "province or state",
        ],
        citizenship: [],
        currentAnnualSalary: ["current salary"],
        expectedAnnualSalary: [
            "expected salary",
            "salary expectation",
            "target salary",
            "compensation",
            "expected compensation",
        ],
        noticePeriod: ["notice period", "when can you start"],
        willingToRelocate: ["willing to relocate"],
        driversLicense: [
            "drivers license",
            "valid drivers license",
            "do you have a valid drivers license",
        ],
        reliableTransportation: [
            "reliable source of transportation",
            "own a car",
        ],
        veteranStatus: ["veteran status"],
        companyBlacklist: [],
        interviewAvailability: [
            "interview availability",
            "when are you available for interviews",
        ],

        // Probably won't ask these questions directly
        // currentlyAttending: [],
        // endDate: [],
        // startDate: [],
        // gpa: [],
        // institutionProvince: [],
        // institutionCity: [],
        // fieldOfStudy: [],
        // institutionName: [],
        // haveHigherEducation: [],

        linkedin: [],
        portfolioUrl: ["portfolio site", "portfolio website"],
        twitter: ["x account"],
        instagram: ["ig"],
        github: ["github page"],
        tiktok: ["tiktok account"],
        youtube: ["youtube channel", "yt channel"],
    };

    for (const field in equivalentPairs) {
        if (field in formData === false) continue;

        // @ts-expect-error
        const equivalentQuestionsList = equivalentPairs[field];
        // @ts-expect-error
        const answer = formData[field];

        for (const eq of equivalentQuestionsList) {
            // @ts-expect-error
            clonedFormData[eq] = answer;
        }
    }

    return clonedFormData;
}
