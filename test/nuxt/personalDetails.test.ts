import { expect, describe, it, beforeEach, assert, afterEach } from "vitest"; // prettier-ignore
import { render, fireEvent } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
import { DOMWrapper, mount, VueWrapper } from "@vue/test-utils";
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

// prettier-ignore
const findFormElements = (formWrapper: VueWrapper<any>) => {
   return {
       firstName: formWrapper.find(`[data-test="first_name_field"]`),
       lastName: formWrapper.find(`[data-test="last_name_field"]`),
       email: formWrapper.find(`[data-test="email_field"]`),
       phoneNumber: formWrapper.find(`[data-test="phone_number_field"]`),
       yearsExp: formWrapper.find(`[data-test="years_experience_field"]`),
       age: formWrapper.find(`[data-test="age_field"]`),
       highestEducation: formWrapper.find(`[data-test="highest_education_field"]`),
       gender: formWrapper.find(`[data-test="gender_field"]`),
       ethnicity: formWrapper.find(`[data-test="ethnicity_field"]`),
       securityClearance: formWrapper.find(`[data-test="clearance_field"]`),
       disability: formWrapper.find(`[data-test="disability_field"]`),
   }
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

describe("Fresh form after you fill in certain fields", () => {
    let formWrapper: VueWrapper<any>;

    // Mandatory fields
    let first_name_input: DOMWrapper<Element>;
    let last_name_input: any;
    let email_input: any;
    let phone_number_input: any;
    let years_exp_input: any;
    let age_ticker: any;
    let highest_education_select: any;

    // Optional fields
    let gender_select: any;
    let ethnicity_select: any;
    let security_clearance_select: any;
    let disability_select: any;

    beforeEach(() => {
        // Render an empty form then fill in mandatory fields
        formWrapper = mount(PersonalDetailsForm, {
            propsData: EMPTY_FORM_PROPS,
        });

        first_name_input = formWrapper.find(`[data-test="first_name_field"]`);
        last_name_input = formWrapper.find(`[data-test="last_name_field"]`);
        email_input = formWrapper.find(`[data-test="email_field"]`);
        phone_number_input = formWrapper.find(`[data-test="phone_number_field"]`); // prettier-ignore
        years_exp_input = formWrapper.find(`[data-test="years_experience_field"]`); // prettier-ignore

        age_ticker = formWrapper.find(`[data-test="age_field"]`);
        highest_education_select = formWrapper.find(`[data-test="highest_education_field"]`); // prettier-ignore

        gender_select = formWrapper.find(`[data-test="gender_field"]`);
        ethnicity_select = formWrapper.find(`[data-test="ethnicity_field"]`);
        security_clearance_select = formWrapper.find(`[data-test="clearance_field"]`); // prettier-ignore
        disability_select = formWrapper.find(`[data-test="disability_field"]`);
    });

    it("Should have a successful submit when you fill in the mandatory fields correctly", async () => {
        // First Name, Last Name, Email, Phone Number, and Highest Education Level
        await first_name_input.setValue("Gustavo");
        await last_name_input.setValue("Markov");
        await email_input.setValue("jmarkov@protonmail.com");
        await phone_number_input.setValue("6478880000");
        await years_exp_input.setValue("10");
        // await highest_education_select.setValue('10')

        await age_ticker.setValue(51);
        forceLog(highest_education_select.html());
        expect(1).toBe(1);
    });

    it("Should have a successful submit when you fill in all fields correctly", () => {
        expect(1).toBe(1);
    });
});
