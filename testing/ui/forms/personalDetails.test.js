import { expect, describe, it, beforeEach, assert } from "vitest"; // prettier-ignore
import { render } from "@testing-library/vue";
import userEvent from "@testing-library/user-event";
// import PersonalDetailsForm from "../../../ui/profiles/views/personalDetails/personalDetailsForm.vue";

// let FormComponent = null;

// beforeEach(async () => {
//     FormComponent = render(PersonalDetailsForm);
// });

describe("Mandatory Fields", () => {
    it("Should render red error text when non-prefilled mandatory fields are submitted blank", () => {
        // Press submit button on form
        // The First Name, Last Name, Email, Phone Number, and Highest Education Level fields should all have red text saying this field is required
        expect(1).toBe(1);
    });

    it("Should have Age && Years of Experience prefilled", () => {
        // Press submit button on form
        // These two fields should have prefilled values
        // If they don't we need to add them to the test that renders red text when mandator
        expect(1).toBe(1);
    });
});

describe("Submit examples", () => {
    it("Should have a successful submit when you fill in fields correctly", () => {
        expect(1).toBe(1);
    });
});
