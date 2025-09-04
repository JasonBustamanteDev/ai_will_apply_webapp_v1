import { expect, describe, it, beforeEach, afterEach } from "vitest"; // prettier-ignore
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup  } from "@testing-library/vue"; // prettier-ignore
import PersonalDetailsForm from "~/ui/profiles/views/personalDetails/personalDetailsForm.vue";
import { PROFILE_FORMS } from "~/shared/utils/globals";
import { forceLog, forceLogElement, fillInputField, selectDropdownOption, assertDropdownValue, assertInputValue } from "../util"; // prettier-ignore

// Prop data
const ENCODED_PROFILE_NAME = "test";
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
            educationLevel: "phd",
        },
        isComplete: true,
    },
};

const getFormElements = () => {
    return {
        firstName: screen.getByTestId("first_name_field"),
        lastName: screen.getByTestId("last_name_field"),
        email: screen.getByTestId("email_field"),
        phoneNumber: screen.getByTestId("phone_number_field"),
        yearsExp: screen.getByTestId("years_experience_field"),
        age: screen.getByTestId("age_field"),
        highestEducation: screen.getByTestId("highest_education_field"),
        gender: screen.getByTestId("gender_field"),
        ethnicity: screen.getByTestId("ethnicity_field"),
        securityClearance: screen.getByTestId("clearance_field"),
        disability: screen.getByTestId("disability_field"),
        submitButton: screen.getByTestId("personal_details_submit_button"),
    };
};

afterEach(() => {
    cleanup(); // Reset screen after each test
});

describe("Completed personalDetails form", () => {
    let form: Element;
    let formElements: ReturnType<typeof getFormElements>;
    beforeEach(() => {
        const { container } = render(PersonalDetailsForm, {
            props: COMPLETED_FORM_PROPS,
        });
        form = container;
        formElements = getFormElements();
    });

    it("Should have all form fields filled in", () => {
        // Check that the input fields are filled
        assertInputValue(formElements.firstName, "Gustavo");
        assertInputValue(formElements.lastName, "Markov");
        assertInputValue(formElements.email, "jmarkov@protonmail.com");
        assertInputValue(formElements.phoneNumber, "6478880000");
        assertInputValue(formElements.yearsExp, "10");
        assertInputValue(formElements.age, "51");

        // Check that the dropdown elements are filled (getByText throws error if 0 matches are found)
        assertDropdownValue(formElements.highestEducation, "PhD");
        assertDropdownValue(formElements.gender, "Male");
        assertDropdownValue(formElements.ethnicity, "White");
        assertDropdownValue(formElements.securityClearance, "Yes");
        assertDropdownValue(formElements.disability, "No");
    });
});

describe("Fresh personalDetails form", () => {
    let form: Element;
    let formElements: ReturnType<typeof getFormElements>;
    let mandatoryElements: HTMLElement[];
    let optionalElements: HTMLElement[];
    beforeEach(() => {
        const { container } = render(PersonalDetailsForm, {
            props: EMPTY_FORM_PROPS,
        });
        form = container;
        formElements = getFormElements();

        mandatoryElements = [
            formElements.firstName,
            formElements.lastName,
            formElements.email,
            formElements.phoneNumber,
            formElements.highestEducation,
        ];
        optionalElements = [
            formElements.gender,
            formElements.ethnicity,
            formElements.securityClearance,
            formElements.disability,
        ];
    });

    it("Should have Age && Years of Experience prefilled", () => {
        assertInputValue(formElements.age, "18");
        assertInputValue(formElements.yearsExp, "2");
    });

    it("Should render a red error border when mandatory fields that are not prefilled are submitted blank", async () => {
        // Submit the form
        const user = userEvent.setup();
        await user.click(formElements.submitButton);
        mandatoryElements.forEach((el) => {
            expect(el.classList.contains("ring-error")).toBe(true);
        });
    });

    it("Should have a successful submit when you fill in the mandatory fields correctly", async () => {
        const user = userEvent.setup();

        // Fill in mandatory fields, submit, then assert there are no error visuals
        await fillInputField(user, formElements.firstName, "Gustavo");
        await fillInputField(user, formElements.lastName, "Markov");
        await fillInputField(user, formElements.age, "54");
        await fillInputField(user, formElements.email, "jmarkov@protonmail.com"); // prettier-ignore
        await fillInputField(user, formElements.phoneNumber, "6478880000");
        await fillInputField(user, formElements.yearsExp, "10");
        await selectDropdownOption(user, formElements.highestEducation, 2);
        await user.click(formElements.submitButton);
        mandatoryElements.forEach((el) => {
            expect(el.classList.contains("ring-error")).toBe(false);
        });

        // Fill in optional fields, submit, then assert there are no error visuals
        await selectDropdownOption(user, formElements.gender);
        await selectDropdownOption(user, formElements.ethnicity);
        await selectDropdownOption(user, formElements.securityClearance);
        await selectDropdownOption(user, formElements.disability, 2);
        await user.click(formElements.submitButton);
        optionalElements.forEach((el) => {
            expect(el.classList.contains("ring-error")).toBe(false);
        });
    });
});
