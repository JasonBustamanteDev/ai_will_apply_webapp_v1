import { expect, describe, it, beforeEach, afterEach } from "vitest"; // prettier-ignore
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup  } from "@testing-library/vue"; // prettier-ignore
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
            noticePeriod: 15,
            willingToRelocate: true,
            driversLicense: true,
            reliableTransportation: true,
            veteranStatus: true,
            companyBlacklist: ["Amazon", "JP Morgan"],
            interviewAvailability: "Mon to Fri between 9AM to 5PM",
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
        submitButton: screen.getByTestId("social_media_submit_button"),
    };
};

afterEach(() => {
    cleanup(); // Reset screen after each test
});
