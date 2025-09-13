import { expect, describe, it, beforeEach, afterEach } from "vitest"; // prettier-ignore
import userEvent, { type UserEvent } from "@testing-library/user-event";
import { render, screen, cleanup, getByText  } from "@testing-library/vue"; // prettier-ignore
import WorkExperienceForm from "~/ui/profiles/views/workExperience/workExperienceForm.vue";
import { PROFILE_FORMS } from "~/shared/utils/globals";
import { forceLog, forceLogElement, fillInputField, selectDropdownOption, assertDropdownValue, assertInputValue } from "../util"; // prettier-ignore

// Prop data
const ENCODED_PROFILE_NAME = "test";
const FORM_NAME = PROFILE_FORMS.WORK_EXPERIENCE;

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
                jobTitle: "Software Engineer",
                company: "Geotrace",
                years: 3,
                currentlyThere: true,
            },
            {
                jobTitle: "Janitor",
                company: "Dollarama",
                years: 1,
                currentlyThere: true,
            },
        ],
        isComplete: true,
    },
};

const getRowElements = (rowIndex: number) => {
    return {
        title: screen.getByTestId(`job_title_${rowIndex}`),
        company: screen.getByTestId(`job_company_${rowIndex}`),
        years: screen.getByTestId(`job_years_${rowIndex}`),
        stillThere: screen.getByTestId(`job_radio_${rowIndex}`),
        trashIcon : screen.getByTestId(`job_trash_icon_${rowIndex}`),
    };
};

const getFormButtons = () => {
    return {
        add: screen.getByTestId("add_job_button"),
        removeAll: screen.getByTestId("no_job_exp_button"),
    };
};

afterEach(() => {
    cleanup(); // Reset screen after each test
});

describe("Filled workExperience form", () => {
    let form: Element;
    let user: UserEvent;
    beforeEach(() => {
        const { container } = render(WorkExperienceForm, {
            props: COMPLETED_FORM_PROPS,
        });
        form = container;
        user = userEvent.setup();
    });

    it("Shows a dynamic number of rows", async () => {
        const jobTitles = screen.queryAllByTestId(/job_title_/);
        const companies = screen.queryAllByTestId(/job_company_/);
        const yearsExp = screen.queryAllByTestId(/job_years_/);

        expect(jobTitles.length).toEqual(2);
        expect(companies.length).toEqual(2);
        expect(yearsExp.length).toEqual(2);

        assertInputValue(jobTitles[0] as HTMLElement, "Software Engineer");
        assertInputValue(companies[0] as HTMLElement, "Geotrace");
        assertInputValue(yearsExp[0] as HTMLElement, "3");

        assertInputValue(jobTitles[1] as HTMLElement, "Janitor");
        assertInputValue(companies[1] as HTMLElement, "Dollarama");
        assertInputValue(yearsExp[1] as HTMLElement, "1");
    });

    it("Removes a row after pressing the remove last button", async () => {
        const row0 = getRowElements(0)
        const row1 = getRowElements(1)

        await user.click(row1.trashIcon)
        expect(screen.queryAllByTestId(/job_row_/).length).toEqual(1);

        await user.click(row0.trashIcon)
        expect(screen.queryAllByTestId(/job_row_/).length).toEqual(0);

        // Should render 'I have no work experience' after pressing Remove Last Experience button enough times"
        const kbdElement = getByText(document.body, 'I have no work experience', { selector: 'kbd' })
        expect(kbdElement).toBeTruthy()
    });

    // it("Renders 'I have no work experience' after pressing the I have no experience button", async () => {});
});
