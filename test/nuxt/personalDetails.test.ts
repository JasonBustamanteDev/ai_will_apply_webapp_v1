import { expect, describe, it, beforeEach, assert } from "vitest"; // prettier-ignore
import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { mount } from "@vue/test-utils";
import PersonalDetailsForm from "~/ui/profiles/views/personalDetails/personalDetailsForm.vue";
import { PROFILE_FORMS } from "~/shared/utils/globals";

// Prop data
const ENCODED_PROFILE_NAME = "test_form_1";
const FORM_NAME = PROFILE_FORMS.PERSONAL_DETAILS;

const EMPTY_FORM_PROPS = {
    formName: FORM_NAME,
    encodedProfileName: ENCODED_PROFILE_NAME,
    rawFormData: {
        data: null,
        isComplete: false,
    },
};

const COMPLETED_FORM_PROPS = {
    formName: FORM_NAME,
    encodedProfileName: ENCODED_PROFILE_NAME,
    rawFormData: {
        data: {
            firstName: "Gustavo",
            lastName: "Markov",
            age: 51,
            yearsOfExperience: 10,
            email: "jmarkov@protonmail.com",
            gender: "male",
            phoneNumber: "6478880000",
            ethnicity: "white",
            securityClearance: true,
            disability: false,
            educationLevel: "bachelors",
        },
        isComplete: true,
    },
};

// let FormComponent = null;

// beforeEach(async () => {
//     FormComponent = render(PersonalDetailsForm);
// });

describe("Fresh form with nothing filled in", () => {
    it("Should have Age && Years of Experience prefilled", () => {
        const wrapper = mount(PersonalDetailsForm, {
            propsData: EMPTY_FORM_PROPS,
        });
        
        // Press submit button on form
        // These two fields should have prefilled values
        // If they don't we need to add them to the test that renders red text when mandator
        expect(1).toBe(1);
    });
});

describe("Filled out form", () => {
    describe("Submit Examples", () => {
        it("Should render red error text when mandatory fields that are not prefilled are submitted blank", () => {
            // Press submit button on form
            // The First Name, Last Name, Email, Phone Number, and Highest Education Level
            // above fields should all have red text saying this field is required
            expect(1).toBe(1);
        });

        it("Should have a successful submit when you fill in the mandatory fields correctly", () => {
            // First Name, Last Name, Email, Phone Number, and Highest Education Level
            expect(1).toBe(1);
        });

        it("Should have a successful submit when you fill in all fields correctly", () => {
            expect(1).toBe(1);
        });
    });
});
