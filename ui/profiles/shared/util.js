import { inRange } from "lodash";

export const booleanOptions = [
    {
        label: "Yes",
        value: true,
    },
    {
        label: "No",
        value: false,
    },
];

export const booleanPlusEmptyOptions = [
    {
        label: "Yes",
        value: true,
    },
    {
        label: "No",
        value: false,
    },
    {
        label: "Would rather not say",
        value: null,
    },
];

export const radioStyleObject = { item: "mr-3" };

export const isValidYearMonth = function (dateString) {
    // Check exact format with regex
    const yearMonthRegex = /^\d{4}-\d{2}$/;
    if (!yearMonthRegex.test(dateString)) {
        return false;
    }

    // Parse year and month
    const [year, month] = dateString.split("-").map(Number);

    // Validate ranges
    const isValidYear = inRange(year, 1920, 2100); // reasonable year range
    const isValidMonth = inRange(month, 1, 13); // 1-12

    return isValidYear && isValidMonth;
};
