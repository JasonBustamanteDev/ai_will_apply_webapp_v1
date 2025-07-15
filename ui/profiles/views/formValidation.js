import { object, string, number, boolean } from "yup";
import { emptyOrMinLengthStringAccepted, verifyMinStringLength, cleanPhoneNumber } from "~/shared/client_helpers"; // prettier-ignore
import { genders, ethnicGroups, educationLevels } from "~/ui/profiles/views/personalDetails/personalDetailsForm.js"; // prettier-ignore
import { booleanPlusEmptyOptions } from "~/ui/profiles/shared/constants.js"; // prettier-ignore
import { countriesList } from "./location/countries";
import { usaDict, canadaDict } from "./location/provinces";

const MESSAGES = {
    REQUIRED: "This field is required",
    MIN_AGE: "Age must be 13 or higher",
    VALID_OPTION: "Please select a valid option",
};

export const personalDetailsSchema = object({
    firstName: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty names", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    lastName: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty names", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    age: number().required(MESSAGES.REQUIRED),
    yearsOfExperience: number()
        .typeError("Enter a valid number")
        .required(MESSAGES.REQUIRED)
        .test("yearsExpValidation", "Must be above 0", function (value) {
            if (value <= 0) return false;
            return true;
        }),
    email: string().email("Invalid email").required(MESSAGES.REQUIRED),
    phoneNumber: string()
        .required(MESSAGES.REQUIRED)
        .test(
            "phone-validation",
            "Enter a valid phone number",
            function (value) {
                if (!value) return false;

                // Remove spaces, dashes, and other formatting characters (keep + for international)
                const cleaned = cleanPhoneNumber(value);

                // Check if it's a valid phone number (10-15 digits, optionally starting with +)
                return /^(\+?[1-9]\d{9,14})$/.test(cleaned);
            }
        ),
    gender: string()
        .nullable()
        .oneOf(
            genders.map((g) => g.value),
            MESSAGES.VALID_OPTION
        ),
    ethnicity: string()
        .nullable()
        .oneOf(
            ethnicGroups.map((g) => g.value),
            MESSAGES.VALID_OPTION
        ),
    educationLevel: string()
        .required(MESSAGES.REQUIRED)
        .oneOf(
            educationLevels.map((g) => g.value),
            MESSAGES.VALID_OPTION
        ),
    securityClearance: boolean().nullable(),
    disability: boolean().nullable(),
});

export const locationSchema = object({
    country: string()
        .required(MESSAGES.REQUIRED)
        .oneOf(
            countriesList.map((g) => g.value),
            "Select a valid country"
        ),
    address: string()
        .nullable()
        .notRequired()
        .test(
            "min-length-no-whitespace",
            "No addresses comprised of empty spaces",
            (value) => {
                return emptyOrMinLengthStringAccepted(value, 1);
            }
        ),
    city: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty addresses", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    postalCode: string()
        .required(MESSAGES.REQUIRED)
        .test("min-length-no-whitespace", "No empty postal codes", (value) => verifyMinStringLength(value, 1)), // prettier-ignore
    provinceState: string()
        .required(MESSAGES.REQUIRED)
        .test(
            "valid-province-or-state",
            "Type the full name of your province/state or the abbreviation (Ex. 'Ontario' or 'ON')",
            function (value) {
                // Verify that the value is in the list of valid provinces/states
                const lowercaseValue = value.toLowerCase();
                const country = this.parent.country;

                if (country === "CA") return lowercaseValue in canadaDict;
                else if (country === "US") return lowercaseValue in usaDict;
                else return verifyMinStringLength(lowercaseValue, 1);
            }
        ),
    citizenship: string()
        .required(MESSAGES.REQUIRED)
        .oneOf(
            countriesList.map((g) => g.value),
            "Select a valid country"
        ),
});
