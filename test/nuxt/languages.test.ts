import { expect, describe, it, beforeEach, afterEach } from "vitest"; // prettier-ignore
import userEvent from "@testing-library/user-event";
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
/*
Initial form should have 1 row with an empty input field
Pressing Add language should cause an error ring to appear since the first field is empty
Pressing trash can should not delete rows since we only have 1

Entering in English → select fluent from dropdown → then submitting should work
Fill english then add language should add a new row. fill it then submit


*/
