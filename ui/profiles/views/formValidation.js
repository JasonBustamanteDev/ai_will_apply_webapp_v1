import { object, string, number, boolean, array } from "yup";
import { emptyOrMinLengthStringAccepted, verifyMinStringLength, cleanPhoneNumber, isValidYearMonth } from "~/shared/client_helpers"; // prettier-ignore
import { genders, ethnicGroups, educationLevels } from "~/ui/profiles/views/personalDetails/personalDetailsForm.js"; // prettier-ignore
import { countriesList } from "./location/countries";
import { usaDict, canadaDict } from "./location/provinces";

const MESSAGES = {
    REQUIRED: "This field is required",
    MIN_AGE: "Age must be 13 or higher",
    VALID_OPTION: "Please select a valid option",
    ONLY_EMPTY: "Answer cannot be empty spaces",
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

export const preferenceSchema = object({
    currentAnnualSalary: number().required(MESSAGES.REQUIRED),
    expectedAnnualSalary: number().required(MESSAGES.REQUIRED),
    noticePeriod: number().required(MESSAGES.REQUIRED),
    willingToRelocate: boolean().required(MESSAGES.REQUIRED),
    driversLicense: boolean().required(MESSAGES.REQUIRED),
    reliableTransportation: boolean().required(MESSAGES.REQUIRED),
    veteranStatus: boolean().required(MESSAGES.REQUIRED),
    companyBlacklist: array()
        .of(string().required())
        .min(0)
        .required(MESSAGES.REQUIRED),
});

export const educationSchema = object({
    institutionName: string()
        .required(MESSAGES.REQUIRED)
        .test("institutionName", MESSAGES.ONLY_EMPTY, (value) =>
            emptyOrMinLengthStringAccepted(value, 1)
        ),
    fieldOfStudy: string()
        .required(MESSAGES.REQUIRED)
        .test("fieldOfStudy", MESSAGES.ONLY_EMPTY, (value) =>
            emptyOrMinLengthStringAccepted(value, 1)
        ),
    institutionCity: string()
        .required(MESSAGES.REQUIRED)
        .test("institutionCity", MESSAGES.ONLY_EMPTY, (value) =>
            emptyOrMinLengthStringAccepted(value, 1)
        ),
    institutionProvince: string()
        .required(MESSAGES.REQUIRED)
        .test("institutionProvince", MESSAGES.ONLY_EMPTY, (value) =>
            emptyOrMinLengthStringAccepted(value, 1)
        ),
    gpa: string("Invalid number")
        .nullable()
        .notRequired()
        .test("gpa", "Type a decimal between 1 to 5", (value) => {
            if (value === undefined || value === "") return true;
            try {
                const num = Number(value);
                return value >= 1 && value <= 5;
            } catch {
                return false;
            }
        }),
    startDate: string()
        .required(MESSAGES.REQUIRED)
        .test("start-date", "YYYY-MM format required", (value) => {
            return isValidYearMonth(value);
        }),
    endDate: string()
        .required(MESSAGES.REQUIRED)
        .test("start-date", "YYYY-MM format required", (value) => {
            return isValidYearMonth(value);
        }),
    currentlyAttending: boolean().required(MESSAGES.REQUIRED),
});

export const socialSchema = object({
    portfolioUrl: string()
        .nullable()
        .notRequired()
        .test(
            "portfolio-url-or-empty",
            "Enter a valid URL like yoursite.com",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid URL format
                try {
                    const url = new URL(normalizedValue);
                    return (
                        url.protocol === "http:" || url.protocol === "https:"
                    );
                } catch {
                    return false;
                }
            }
        ),
    linkedin: string()
        .nullable()
        .notRequired()
        .test(
            "linkedin-url-or-empty",
            "Enter a valid URL like linkedin.com/in/john-smith/",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid LinkedIn URL
                return /^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
    github: string()
        .nullable()
        .notRequired()
        .test(
            "github-url-or-empty",
            "Enter a valid URL like github.com/username",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid GitHub URL
                return /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9\-_]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
    twitter: string()
        .nullable()
        .notRequired()
        .test(
            "twitter-url-or-empty",
            "Enter a valid URL like twitter.com/username",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid Twitter or X URL
                return /^https?:\/\/(www\.)?(twitter\.com|x\.com)\/[a-zA-Z0-9_]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
    instagram: string()
        .nullable()
        .notRequired()
        .test(
            "instagram-url-or-empty",
            "Enter a valid URL like instagram.com/username",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid Instagram URL
                return /^https?:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9._]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
    tiktok: string()
        .nullable()
        .notRequired()
        .test(
            "tiktok-url-or-empty",
            "Enter a valid URL like tiktok.com/@username",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid TikTok URL
                return /^https?:\/\/(www\.)?tiktok\.com\/@[a-zA-Z0-9._]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
    youtube: string()
        .nullable()
        .notRequired()
        .test(
            "youtube-url-or-empty",
            "Enter a valid URL like youtube.com/@username",
            function (value) {
                if (!value || value === "") return true;

                // Add https:// if missing
                const normalizedValue =
                    value.startsWith("http://") || value.startsWith("https://")
                        ? value
                        : `https://${value}`;

                // Check if it's a valid YouTube URL
                return /^https?:\/\/(www\.)?youtube\.com\/@[a-zA-Z0-9._-]+\/?$/.test(
                    normalizedValue
                );
            }
        ),
});
