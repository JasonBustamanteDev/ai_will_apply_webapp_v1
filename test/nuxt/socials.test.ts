import { expect, describe, it, beforeEach, afterEach } from "vitest"; // prettier-ignore
import userEvent from "@testing-library/user-event";
import { render, screen, cleanup  } from "@testing-library/vue"; // prettier-ignore
import PreferenceForm from "~/ui/profiles/views/socials/socialsForm.vue";
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
    return {
        portfolioUrl: screen.getByTestId("portfolio_url_field"),
        linkedin: screen.getByTestId("linkedin_field"),
        github: screen.getByTestId("github_field"),
        instagram: screen.getByTestId("instagram_field"),
        twitter: screen.getByTestId("twitter_field"),
        tiktok: screen.getByTestId("tiktok_field"),
        youtube: screen.getByTestId("youtube_field"),
        submitButton: screen.getByTestId("submit-button"),
    };
};

afterEach(() => {
    // Reset screen after each test
    cleanup();
});
