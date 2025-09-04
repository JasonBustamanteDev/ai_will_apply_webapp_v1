import { expect, describe, it, beforeEach, afterEach } from "vitest"; // prettier-ignore
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup, within  } from "@testing-library/vue"; // prettier-ignore
import PreferenceForm from "~/ui/profiles/views/preferences/preferenceForm.vue";
import { PROFILE_FORMS } from "~/shared/utils/globals";
import { forceLog, forceLogElement, fillInputField, selectDropdownOption, assertDropdownValue, assertInputValue } from "../util"; // prettier-ignore

// Prop data
const ENCODED_PROFILE_NAME = "test";
const FORM_NAME = PROFILE_FORMS.PREFERENCES;

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
            currentAnnualSalary: 75000,
            expectedAnnualSalary: 100000,
            noticePeriod: 14,
            willingToRelocate: true,
            driversLicense: true,
            reliableTransportation: true,
            veteranStatus: false,
            companyBlacklist: ["Amazon", "JP Morgan"],
            interviewAvailability: "Mon to Fri between 9AM to 6PM",
        },
        isComplete: true,
    },
};

const getFormElements = () => {
    return {
        currentSalary: screen.getByTestId("current_salary_field"),
        expectedSalary: screen.getByTestId("expected_salary_field"),
        noticePeriod: screen.getByTestId("notice_period_field"),
        relocation: screen.getByTestId("relocation_field"),
        license: screen.getByTestId("license_field"),
        transportation: screen.getByTestId("transportation_field"),
        veteranStatus: screen.getByTestId("veteran_field"),
        interviewAvailability: screen.getByTestId(
            "interview_availability_field"
        ),
        companyBlacklist: screen.getByTestId("company_blacklist_field"),

        submitButton: screen.getByTestId("preference_submit_button"),
    };
};

afterEach(() => {
    cleanup(); // Reset screen after each test
});

describe("Completed preferences form", () => {
    let form: Element;
    let formElements: ReturnType<typeof getFormElements>;
    beforeEach(() => {
        const { container } = render(PreferenceForm, {
            props: COMPLETED_FORM_PROPS,
        });
        form = container;
        formElements = getFormElements();
    });

    it("Should have all form fields filled in", () => {
        assertInputValue(formElements.currentSalary, "75,000");
        assertInputValue(formElements.expectedSalary, "100,000");
        assertInputValue(formElements.noticePeriod, "14");
        assertInputValue(formElements.interviewAvailability, "Mon to Fri between 9AM to 6PM"); // prettier-ignore

        const blacklistParent = screen.getByTestId("company_blacklist_parent");
        within(blacklistParent).getByText("JP Morgan");
        within(blacklistParent).getByText("Amazon");

        const checkboxes = [
            { field: formElements.relocation, isTrue: true },
            { field: formElements.license, isTrue: true },
            { field: formElements.transportation, isTrue: true },
            { field: formElements.veteranStatus, isTrue: false },
        ];
        checkboxes.forEach((obj) => {
            const field = obj.field;
            const yesButton = field.querySelector('button[value="true"]');
            const noButton = field.querySelector('button[value="false"]');

            const expectedYes = obj.isTrue ? "true" : "false";
            const expectedNo = obj.isTrue ? "false" : "true";

            expect(yesButton?.getAttribute("aria-checked")).toEqual(
                expectedYes
            );
            expect(noButton?.getAttribute("aria-checked")).toEqual(expectedNo);
        });
    });
});

describe("Fresh preferences form", () => {
    let form: Element;
    let formElements: ReturnType<typeof getFormElements>;
    let mandatoryElements: HTMLElement[];
    let optionalElements: HTMLElement[];
    beforeEach(() => {
        const { container } = render(PreferenceForm, {
            props: EMPTY_FORM_PROPS,
        });
        form = container;
        formElements = getFormElements();

        mandatoryElements = [
            formElements.currentSalary,
            formElements.expectedSalary,
            formElements.noticePeriod,
            formElements.relocation,
            formElements.license,
            formElements.transportation,
            formElements.veteranStatus,
            formElements.interviewAvailability,
        ];
        optionalElements = [formElements.companyBlacklist];
    });

    it("Should have the boolean fields prefilled by default", async () => {
        const defaultCheckboxes = [
            { field: formElements.relocation, isTrue: true },
            { field: formElements.license, isTrue: true },
            { field: formElements.transportation, isTrue: true },
            { field: formElements.veteranStatus, isTrue: false },
        ];
        defaultCheckboxes.forEach((obj) => {
            const field = obj.field;
            const yesButton = field.querySelector('button[value="true"]');
            const noButton = field.querySelector('button[value="false"]');

            const expectedYes = obj.isTrue ? "true" : "false";
            const expectedNo = obj.isTrue ? "false" : "true";

            expect(yesButton?.getAttribute("aria-checked")).toEqual(
                expectedYes
            );
            expect(noButton?.getAttribute("aria-checked")).toEqual(expectedNo);
        });
    });

    it("Should render a red error border when mandatory fields are submitted blank", async () => {
        const user = userEvent.setup();

        const {
            currentSalary,
            expectedSalary,
            noticePeriod,
            interviewAvailability,
            submitButton,
        } = formElements;

        await user.clear(currentSalary);
        await user.clear(expectedSalary);
        await user.clear(noticePeriod);
        await user.clear(interviewAvailability);
        await user.click(submitButton);

        const mandatoryNotPrefilledFields = [
            currentSalary,
            expectedSalary,
            noticePeriod,
            interviewAvailability,
        ];
        mandatoryNotPrefilledFields.forEach((el) => {
            expect(el.classList.contains("ring-error")).toBe(true);
        });
    });

    // it("Should have a successful submit when you fill in the mandatory fields correctly", async () => {});
});
