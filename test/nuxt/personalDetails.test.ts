import { expect, describe, it, beforeEach, assert, afterEach } from "vitest"; // prettier-ignore
import { render, fireEvent } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { mount, VueWrapper } from "@vue/test-utils";
import PersonalDetailsForm from "~/ui/profiles/views/personalDetails/personalDetailsForm.vue";
import { PROFILE_FORMS } from "~/shared/utils/globals";
import { forceLog, delay } from "../util";
import { nextTick } from "vue";

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

describe("Fresh form with nothing filled in", () => {
    // Render a new instance of an unfilled instance of the form for each test in this describe
    let formWrapper: VueWrapper<any>;
    beforeEach(() => {
        formWrapper = mount(PersonalDetailsForm, {
            propsData: EMPTY_FORM_PROPS,
        });
    });

    it("Should have Age && Years of Experience prefilled", () => {
        // Find the components that should have default values if form is fresh
        const age_select = formWrapper.find(`[data-test="age_field"]`);
        const years_experience_input = formWrapper.find(
            '[data-test="years_experience_field"]'
        );

        // If you want to log the components you found
        // forceLog(age_select_component.html())
        // forceLog(years_experience_input_component.html())

        // Assert that these components have default values
        assert.equal(age_select.element.value, 18);
        assert.equal(years_experience_input.element.value, 2);
        // @ts-nocheck (put atop page once tests are written)
    });

    it("Should render red error text when mandatory fields that are not prefilled are submitted blank", async () => {
        // Submit the form
        await formWrapper.trigger("submit");
        await formWrapper.vm.$nextTick();

        // These fields should all have a ring-error attribute
        const data_attributes = [
            "first_name_field",
            "last_name_field",
            "email_field",
            "phone_number_field",
            "highest_education_field",
        ];
        data_attributes.forEach((attr) => {
            const form_field = formWrapper.find(`[data-test="${attr}"]`);
            expect(form_field.classes()).toContain("ring-error");
        });
    });
});

// describe("Filled out form", () => {
//     describe("Submit Examples", () => {
//         it("Should have a successful submit when you fill in the mandatory fields correctly", () => {
//             // First Name, Last Name, Email, Phone Number, and Highest Education Level
//             expect(1).toBe(1);
//         });

//         it("Should have a successful submit when you fill in all fields correctly", () => {
//             expect(1).toBe(1);
//         });
//     });
// });
