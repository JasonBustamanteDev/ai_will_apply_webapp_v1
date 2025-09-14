import { expect, describe, it, beforeEach, afterEach } from "vitest"; // prettier-ignore
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup  } from "@testing-library/vue"; // prettier-ignore
import SocialsForm from "~/ui/profiles/views/socials/socialsForm.vue";
import { PROFILE_FORMS } from "~/shared/utils/globals";
import { forceLog, forceLogElement, fillInputField, selectDropdownOption, assertDropdownValue, assertInputValue } from "../util"; // prettier-ignore

// Prop data
const ENCODED_PROFILE_NAME = "test";
const FORM_NAME = PROFILE_FORMS.MEDIA_LINKS;

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
            linkedin: "https://www.linkedin.com/in/jason-bustamante/",
            portfolioUrl: "https://brittanychiang.com/",
            twitter: "https://x.com/markiplier",
            instagram: "https://www.instagram.com/lilnasx",
            github: "https://github.com/johnthebrit",
            tiktok: "https://www.tiktok.com/@snarkymarky",
            youtube: "https://www.youtube.com/@Fortunate",
        },
        isComplete: true,
    },
};

const getFormElements = () => {
    // prettier-ignore
    return {
        portfolioUrl: screen.getByTestId("portfolio_url_field") as HTMLInputElement,
        linkedin: screen.getByTestId("linkedin_field") as HTMLInputElement,
        github: screen.getByTestId("github_field") as HTMLInputElement,
        instagram: screen.getByTestId("instagram_field") as HTMLInputElement,
        twitter: screen.getByTestId("twitter_field") as HTMLInputElement,
        tiktok: screen.getByTestId("tiktok_field") as HTMLInputElement,
        youtube: screen.getByTestId("youtube_field") as HTMLInputElement,
        submitButton: screen.getByTestId("socials_submit_button"),
    };
};

afterEach(() => {
    cleanup(); // Reset screen after each test
});

describe("Completed socials form", () => {
    let form: Element;
    let formElements: ReturnType<typeof getFormElements>;
    beforeEach(() => {
        const { container } = render(SocialsForm, {
            props: COMPLETED_FORM_PROPS,
        });
        form = container;
        formElements = getFormElements();
    });

    // prettier-ignore
    it("Should have all form fields filled in", () => {
        assertInputValue(formElements.portfolioUrl, "https://brittanychiang.com/")
        assertInputValue(formElements.linkedin, "https://www.linkedin.com/in/jason-bustamante/")
        assertInputValue(formElements.github, "https://github.com/johnthebrit")
        assertInputValue(formElements.instagram, "https://www.instagram.com/lilnasx")
        assertInputValue(formElements.twitter, "https://x.com/markiplier")
        assertInputValue(formElements.tiktok, "https://www.tiktok.com/@snarkymarky")
        assertInputValue(formElements.youtube, "https://www.youtube.com/@Fortunate")
    });
});

describe("Fresh socials form", () => {
    let form: Element;
    let formElements: ReturnType<typeof getFormElements>;
    let mandatoryElements: HTMLElement[];
    let optionalElements: HTMLElement[];
    beforeEach(() => {
        const { container } = render(SocialsForm, {
            props: EMPTY_FORM_PROPS,
        });
        form = container;
        formElements = getFormElements();

        mandatoryElements = [];
        optionalElements = [
            formElements.portfolioUrl,
            formElements.linkedin,
            formElements.github,
            formElements.instagram,
            formElements.twitter,
            formElements.tiktok,
            formElements.youtube,
        ];
    });

    it("Blank form submit should work", async () => {
        const user = userEvent.setup();
        await user.click(formElements.submitButton);
        mandatoryElements.forEach((el) => {
            expect(el.classList.contains("ring-error")).toBe(false);
        });
    });

    // prettier-ignore
    it("Submit should work when all form fields are filled", async () => {
        const user = userEvent.setup();

        await fillInputField(user, formElements.portfolioUrl, "https://brittanychiang.com/");
        await fillInputField(user, formElements.linkedin, "https://www.linkedin.com/in/jason-bustamante/");
        await fillInputField(user, formElements.github, "https://github.com/johnthebrit");
        await fillInputField(user, formElements.instagram, "https://www.instagram.com/lilnasx");
        await fillInputField(user, formElements.twitter, "https://x.com/markiplier");
        await fillInputField(user, formElements.tiktok, "https://www.tiktok.com/@snarkymarky");
        await fillInputField(user, formElements.youtube, "https://www.youtube.com/@Fortunate");
        await user.click(formElements.submitButton);

        mandatoryElements.forEach((el) => {
            expect(el.classList.contains("ring-error")).toBe(false);
        });
        optionalElements.forEach((el) => {
            expect(el.classList.contains("ring-error")).toBe(false);
        });
    });
});
