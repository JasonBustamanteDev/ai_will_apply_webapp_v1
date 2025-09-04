import { expect, describe, it, beforeEach, afterEach } from "vitest"; // prettier-ignore
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup  } from "@testing-library/vue"; // prettier-ignore
import EducationForm from "~/ui/profiles/views/education/educationForm.vue";
import { PROFILE_FORMS } from "~/shared/utils/globals";
import { forceLog, forceLogElement, fillInputField, selectDropdownOption, assertDropdownValue, assertInputValue } from "../util"; // prettier-ignore

// Prop data
const ENCODED_PROFILE_NAME = "test";
const FORM_NAME = PROFILE_FORMS.EDUCATION;

const EMPTY_FORM_PROPS = {
    formName: FORM_NAME,
    encodedProfileName: ENCODED_PROFILE_NAME,
    rawFormData: {
        data: null,
        isComplete: false,
    },
};

const COMPLETED_FORM_WITHOUT_EDUCATION_PROPS = {
    formName: FORM_NAME,
    encodedProfileName: ENCODED_PROFILE_NAME,
    rawFormData: {
        data: { haveHigherEducation: false },
        isComplete: true,
    },
};

const COMPLETED_FORM_WITH_EDUCATION_PROPS = {
    formName: FORM_NAME,
    encodedProfileName: ENCODED_PROFILE_NAME,
    rawFormData: {
        data: {
            currentlyAttending: false,
            startDate: "2014-09",
            endDate: "2018-04",
            gpa: 3.11,
            institutionProvince: "ON",
            institutionCity: "Oshawa",
            fieldOfStudy: "Mechanical Engineering",
            institutionName: "Ontario Tech University",
            haveHigherEducation: true,
        },
        isComplete: true,
    },
};

const getFormElements = () => {
    return {
        haveHigherEducation: screen.getByTestId("have_higher_education_field"), // switch that can disable the form

        institutionName: screen.getByTestId("institution_name_field"),
        fieldOfStudy: screen.getByTestId("field_of_study_field"),
        institutionCity: screen.getByTestId("institution_city_field"),
        institutionProvince: screen.getByTestId("institution_province_field"),
        startDate: screen.getByTestId("start_date_field"),
        endDate: screen.getByTestId("end_date_field"),
        currentlyAttending: screen.getByTestId("currently_attending_field"),
        gpa: screen.getByTestId("gpa_field"),
        submitButton: screen.getByTestId("education_submit_button"),
    };
};

afterEach(() => {
    cleanup(); // Reset screen after each test
});

describe("Completed education form", () => {
    it("With education + all fields", () => {
        render(EducationForm, {
            props: COMPLETED_FORM_WITH_EDUCATION_PROPS,
        });
        const formElements = getFormElements();

        assertInputValue(
            formElements.institutionName,
            "Ontario Tech University"
        );
        assertInputValue(formElements.fieldOfStudy, "Mechanical Engineering");
        assertInputValue(formElements.institutionCity, "Oshawa");
        assertInputValue(formElements.institutionProvince, "ON");
        assertInputValue(formElements.startDate, "2014-09");
        assertInputValue(formElements.endDate, "2018-04");
        assertInputValue(formElements.gpa, "3.11");

        const currentlyAttendingCheckbox = formElements.currentlyAttending;
        const yesButton = currentlyAttendingCheckbox.querySelector(
            'button[value="true"]'
        );
        const noButton = currentlyAttendingCheckbox.querySelector(
            'button[value="false"]'
        );
        expect(yesButton?.getAttribute("aria-checked")).toEqual("false");
        expect(noButton?.getAttribute("aria-checked")).toEqual("true");
    });

    // it("With no education", () => {
    //     const { container } = render(EducationForm, {
    //         props: COMPLETED_FORM_WITHOUT_EDUCATION_PROPS,
    //     });
    //     const form = container;
    //     const formElements = getFormElements();
    // });
});

// describe("Fresh education form", () => {
//     let form: Element;
//     let formElements: ReturnType<typeof getFormElements>;
//     let mandatoryElements: HTMLElement[];
//     let optionalElements: HTMLElement[];
//     beforeEach(() => {
//         const { container } = render(EducationForm, {
//             props: EMPTY_FORM_PROPS,
//         });
//         form = container;
//         formElements = getFormElements();

//         mandatoryElements = [
//             formElements.institutionName,
//             formElements.fieldOfStudy,
//             formElements.institutionCity,
//             formElements.institutionProvince,
//             formElements.startDate,
//             formElements.endDate,
//             formElements.currentlyAttending,
//         ];
//         optionalElements = [formElements.gpa];
//     });

//     it("Should have Age && Years of Experience prefilled", () => {});

//     it("Should render a red error border when mandatory fields that are not prefilled are submitted blank", async () => {});

//     it("Should have a successful submit when you fill in the mandatory fields correctly", async () => {});
// });
