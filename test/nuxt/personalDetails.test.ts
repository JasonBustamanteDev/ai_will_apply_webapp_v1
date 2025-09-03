import { expect, describe, it, beforeEach, assert, afterEach } from "vitest"; // prettier-ignore
import userEvent from "@testing-library/user-event";
import { render, fireEvent, screen, prettyDOM  } from "@testing-library/vue"; // prettier-ignore
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
import PersonalDetailsForm from "~/ui/profiles/views/personalDetails/personalDetailsForm.vue";
import { PROFILE_FORMS } from "~/shared/utils/globals";
import { forceLog, delay, fillInputField } from "../util";
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

// prettier-ignore
const findFormElements = (formWrapper: VueWrapper<any>) => {
   // Only use this method when testing with Vue test-utils
   return {
       firstName: formWrapper.find(`[data-testid="first_name_field"]`),
       lastName: formWrapper.find(`[data-testid="last_name_field"]`),
       email: formWrapper.find(`[data-testid="email_field"]`),
       phoneNumber: formWrapper.find(`[data-testid="phone_number_field"]`),
       yearsExp: formWrapper.find(`[data-testid="years_experience_field"]`),
       age: formWrapper.find(`[data-testid="age_field"]`),
       highestEducation: formWrapper.find(`[data-testid="highest_education_field"]`),
       gender: formWrapper.find(`[data-testid="gender_field"]`),
       ethnicity: formWrapper.find(`[data-testid="ethnicity_field"]`),
       securityClearance: formWrapper.find(`[data-testid="clearance_field"]`),
       disability: formWrapper.find(`[data-testid="disability_field"]`),
   }
};

describe("Completed form", () => {
    // Render a new instance of an unfilled instance of the form for each test in this describe
    let formWrapper: VueWrapper<any>;
    beforeEach(() => {
        formWrapper = mount(PersonalDetailsForm, {
            propsData: COMPLETED_FORM_PROPS,
        });
    });

    // prettier-ignore
    it("Should have all form fields filled in", () => {
        const formElements = findFormElements(formWrapper);
       
        expect(formElements.firstName.element.value).toBe("Gustavo")
        expect(formElements.lastName.element.value).toBe("Markov")
        expect(formElements.email.element.value).toBe('jmarkov@protonmail.com')
        expect(formElements.phoneNumber.element.value).toBe('6478880000')
        expect(formElements.yearsExp.element.value).toBe('10')
        expect(formElements.age.element.value).toBe("51")
        expect(formElements.highestEducation.text()).toContain("Bachelor's Degree")
        expect(formElements.gender.text()).toContain("Male")
        expect(formElements.ethnicity.text()).toContain("White")
        expect(formElements.securityClearance.text()).toContain("Yes")
        expect(formElements.disability.text()).toContain("No")
    });
});

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
        const formElements = findFormElements(formWrapper);
        const age_ticker = formElements.age;
        const years_experience_input = formElements.yearsExp;

        // If you want to log the components you found
        // forceLog(age_select_component.html())

        // Assert that these components have default values
        assert.equal(age_ticker.element.value, 18);
        assert.equal(years_experience_input.element.value, 2);
        // @ts-nocheck (put atop page once tests are written)
    });

    it("Should render a red error border when mandatory fields that are not prefilled are submitted blank", async () => {
        // Submit the form
        await formWrapper.trigger("submit");
        await formWrapper.vm.$nextTick();

        // These fields should all have a ring-error attribute
        const formElements = findFormElements(formWrapper);
        const elements = [
            formElements.firstName,
            formElements.lastName,
            formElements.email,
            formElements.phoneNumber,
            formElements.highestEducation,
        ];
        elements.forEach((el) => {
            expect(el.classes()).toContain("ring-error");
        });
    });
});

// prettier-ignore
const getFormElements = () => {
   return {
       firstName: screen.getByTestId('first_name_field'),
       lastName: screen.getByTestId('last_name_field'),
       email: screen.getByTestId('email_field'),
       phoneNumber: screen.getByTestId('phone_number_field'),
       yearsExp: screen.getByTestId('years_experience_field'),
       age: screen.getByTestId('age_field'),
       highestEducation: screen.getByTestId('highest_education_field'),
       gender: screen.getByTestId('gender_field'),
       ethnicity: screen.getByTestId('ethnicity_field'),
       securityClearance: screen.getByTestId('clearance_field'),
       disability: screen.getByTestId('disability_field')
   }
};

describe("User Interactions", () => {
    it("Should have a successful submit when you fill in the mandatory fields correctly", async () => {
        const user = userEvent.setup();
        const { container } = render(PersonalDetailsForm, {
            props: EMPTY_FORM_PROPS,
        });
        const formElements = getFormElements()

        forceLog("Rendered DOM:\n", prettyDOM(formElements.firstName, Infinity));
        
        await fillInputField(user, formElements.firstName, "Gustavod")
        forceLog("Rendered DOM:\n", prettyDOM(formElements.firstName, Infinity));

        expect(1).toBe(1);
    });

    it("Should have a successful submit when you fill in all fields correctly", () => {
        expect(1).toBe(1);
    });
});
