import { expect, describe, it, beforeEach, afterEach } from "vitest"; // prettier-ignore
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { render, screen, cleanup  } from "@testing-library/vue"; // prettier-ignore
import SkillsForm from "~/ui/profiles/views/skills/skillsForm.vue";
import { PROFILE_FORMS } from "~/shared/utils/globals";
import { forceLog, forceLogElement, fillInputField, selectDropdownOption, assertDropdownValue, assertInputValue } from "../util"; // prettier-ignore

// Prop data
const ENCODED_PROFILE_NAME = "test";
const FORM_NAME = PROFILE_FORMS.SKILLS;

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
            { name: "SQL", years: 2 },
            { name: "JS", years: 4 },
        ],
        isComplete: true,
    },
};

const getFormElements = (rowIndex: number) => {
    return {
        skillRow: screen.getByTestId(`skill_row_${rowIndex}`),
        skillField: screen.getByTestId(`skill_field_${rowIndex}`),
        years: screen.getByTestId(`skill_years_${rowIndex}`),
        trashIcon: screen.getByTestId(`skill_trash_icon_${rowIndex}`),
    };
};

afterEach(() => {
    cleanup(); // Reset screen after each test
});

describe("Filled skills form", () => {
    let form: Element;
    let user: UserEvent;
    beforeEach(() => {
        const { container } = render(SkillsForm, {
            props: COMPLETED_FORM_PROPS,
        });
        form = container;
        user = userEvent.setup();
    });

    it("Should show 2 rows", async () => {
        const skillInputs = screen.queryAllByTestId(/skill_field_/);
        expect(skillInputs.length).toEqual(2);
        assertInputValue(skillInputs[0] as HTMLElement, "SQL");
        assertInputValue(skillInputs[1] as HTMLElement, "JS");
    });

    it("Should delete a row when trash icon is pressed when 2+ rows exist, unless we only have 1 row left", async () => {
        // Last 1 should be disabled for trash
        const row1 = getFormElements(0);
        const row2 = getFormElements(1); // remains saved in memory even after test deletes it

        // The delete icon should be enabled for both
        expect(row1.trashIcon.hasAttribute("disabled")).toEqual(false);
        expect(row2.trashIcon.hasAttribute("disabled")).toEqual(false);

        // Pressing trash icon on row #1 should delete it
        await user.click(row1.trashIcon);

        // Only 1 row should be left now
        const skillInputsAtEnd = screen.queryAllByTestId(/skill_field_/);
        expect(skillInputsAtEnd.length).toEqual(1);

        // Delete icon should be disabled on the final row
        expect(row1.trashIcon.hasAttribute("disabled")).toEqual(true);
    });
});

describe("Fresh skills form", () => {
    let form: Element;
    let defaultYearsExpInput: HTMLInputElement;
    let user: UserEvent;
    beforeEach(() => {
        const { container } = render(SkillsForm, {
            props: EMPTY_FORM_PROPS,
        });
        form = container;
        user = userEvent.setup();
        defaultYearsExpInput = screen.getByTestId("skill_default_years") as HTMLInputElement; // prettier-ignore
    });

    it("Should show 1 empty row with the default experience applied", async () => {
        const skillRows = screen.queryAllByTestId(/skill_row_/);
        expect(skillRows.length).toEqual(1);

        const { skillField, years } = getFormElements(0);
        assertInputValue(skillField, "");
        assertInputValue(years, "2");
    });

    it("Should add a new row with default experience applied if the add skill button is pressed", async () => {
        const startDefaultExp = defaultYearsExpInput.value;
        const endDefaultExp = "4";

        // Increment default years experience to 4
        await fillInputField(user, defaultYearsExpInput, endDefaultExp);

        // Press the Add Skill button
        const addSkillButton = screen.getByTestId("add_skill_button_0");
        await user.click(addSkillButton);

        const skillYears = screen.queryAllByTestId(/skill_years_/);
        const yearsExp0 = skillYears[0] as HTMLInputElement;
        const yearsExp1 = skillYears[1] as HTMLInputElement;

        // First row should use the original default experience
        assertInputValue(yearsExp0, startDefaultExp);

        // Newly added row should use the new default experience
        assertInputValue(yearsExp1, endDefaultExp);
    });
});
