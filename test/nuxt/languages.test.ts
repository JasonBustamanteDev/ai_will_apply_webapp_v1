import { expect, describe, it, beforeEach, afterEach } from "vitest"; // prettier-ignore
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { render, screen, cleanup  } from "@testing-library/vue"; // prettier-ignore
import LanguagesForm from "~/ui/profiles/views/languages/languagesForm.vue";
import { PROFILE_FORMS } from "~/shared/utils/globals";
import { forceLog, forceLogElement, fillInputField, selectDropdownOption, assertDropdownValue, assertInputValue } from "../util"; // prettier-ignore

// Prop data
const ENCODED_PROFILE_NAME = "test";
const FORM_NAME = PROFILE_FORMS.LANGUAGES;

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
        data: [
            {
                language: "English",
                proficiency: "native",
            },
            {
                language: "Spanish",
                proficiency: "intermediate",
            },
        ],
        isComplete: true,
    },
};

const getFormElements = (rowIndex: number) => {
    return {
        languageField: screen.getByTestId(`lang_field_${rowIndex}`),
        fluencyDropdown: screen.getByTestId(`lang_select_${rowIndex}`),
        trashIcon: screen.getByTestId(`lang_trash_icon_${rowIndex}`),
    };
};

afterEach(() => {
    cleanup(); // Reset screen after each test
});

describe("Filled languages form", () => {
    let form: Element;
    let user: UserEvent;
    beforeEach(() => {
        const { container } = render(LanguagesForm, {
            props: COMPLETED_FORM_PROPS,
        });
        form = container;
        user = userEvent.setup();
    });

    it("Should show 2 rows", async () => {
        const langInputsAtStart = screen.queryAllByTestId(/lang_field_/);
        expect(langInputsAtStart.length).toEqual(2);
        assertInputValue(langInputsAtStart[0] as HTMLElement, "English");
        assertInputValue(langInputsAtStart[1] as HTMLElement, "Spanish");
    });

    it("Pressing trash icon should delete a row if we have 2 or more of them", async () => {
        const row1 = getFormElements(0);
        const row2 = getFormElements(1); // remains saved in memory even after test deletes it

        // The delete icon should be enabled for both
        expect(row1.trashIcon.hasAttribute("disabled")).toEqual(false);
        expect(row2.trashIcon.hasAttribute("disabled")).toEqual(false);

        // Pressing trash icon on row #1 should delete it
        await user.click(row1.trashIcon);

        // Only 1 row should be left now
        const langInputsAtEnd = screen.queryAllByTestId(/lang_field_/);
        expect(langInputsAtEnd.length).toEqual(1);

        // Delete icon should be disabled on the final row
        expect(row1.trashIcon.hasAttribute("disabled")).toEqual(true);
    });
});

describe("Fresh languages form", () => {
    let form: Element;
    let user: UserEvent;
    beforeEach(() => {
        const { container } = render(LanguagesForm, {
            props: EMPTY_FORM_PROPS,
        });
        form = container;
        user = userEvent.setup();
    });

    it("Should render error visuals if Add Language button is pressed when language field is blank", async () => {
        // Find trash icon and press it
        const submitButton = screen.getByTestId("lang_submit_button");
        await user.click(submitButton);

        // Check for error visuals on lang input
        const { languageField } = getFormElements(0);
        expect(languageField.classList.contains("ring-error")).toBe(true);
    });

    it("Should disable trash button if we only have 1 row", async () => {
        const row0 = getFormElements(0);

        // Enter a language: French
        await fillInputField(user, row0.languageField, "French");

        // Hit add language button
        const addLangButton = screen.getByTestId("lang_add_button");
        await user.click(addLangButton);

        // Second row should appear
        const langInputs = screen.queryAllByTestId(/lang_field_/);
        expect(langInputs.length).toEqual(2);

        // Enter 2nd Language: Russian with Fluency as Intermediate
        const {
            fluencyDropdown: fluencyDropdown1,
            languageField: languageField1,
        } = getFormElements(1);

        await fillInputField(user, languageField1, "Russian");
        await selectDropdownOption(user, fluencyDropdown1, 4);

        const fluencyDropdown1Text = fluencyDropdown1.textContent.trim();
        expect(fluencyDropdown1Text).toEqual("Intermediate");

        // Submit
        const submitButton = screen.getByTestId("lang_submit_button");
        await user.click(submitButton);
    });
});
