import { expect, describe, it, beforeEach, afterEach } from "vitest"; // prettier-ignore
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup  } from "@testing-library/vue"; // prettier-ignore
import LocationForm from "~/ui/profiles/views/location/locationForm.vue";
import { PROFILE_FORMS } from "~/shared/utils/globals";
import { forceLog, forceLogElement, fillInputField, selectDropdownOption, assertDropdownValue, assertInputValue } from "../util"; // prettier-ignore

// Prop data
const ENCODED_PROFILE_NAME = "test";
const FORM_NAME = PROFILE_FORMS.LOCATION;

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
            country: "US",
            address: "Vegas drive",
            city: "Houston",
            postalCode: "L1590F",
            provinceState: "Texas",
            citizenship: "US",
        },
        isComplete: true,
    },
};

const getFormElements = () => {
    return {
        country: screen.getByTestId("country_field"),
        citizenship: screen.getByTestId("citizenship_field"),
        city: screen.getByTestId("city_field"),
        postalCode: screen.getByTestId("postal_code_field"),
        provinceState: screen.getByTestId("province_field"),
        address: screen.getByTestId("address_field"),
        submitButton: screen.getByTestId("location_submit_button"),
    };
};

afterEach(() => {
    // Reset screen after each test
    cleanup();
});

describe("Completed location form", () => {
    let form: Element;
    let formElements: ReturnType<typeof getFormElements>;
    beforeEach(() => {
        const { container } = render(LocationForm, {
            props: COMPLETED_FORM_PROPS,
        });
        form = container;
        formElements = getFormElements();
    });

    it("Should have all form fields filled in", () => {
        // Check that the input fields are filled
        assertInputValue(formElements.city, "Houston");
        assertInputValue(formElements.postalCode, "L1590F");
        assertInputValue(formElements.address, "Vegas drive");
        assertInputValue(formElements.provinceState, "Texas");

        // Check that the dropdown elements are filled (getByText throws error if 0 matches are found)
        assertDropdownValue(formElements.country, "United States");
        assertDropdownValue(formElements.citizenship, "United States");
        forceLogElement(formElements.country)
    });
});

// describe("Fresh location form", () => {});
