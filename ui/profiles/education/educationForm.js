import { inRange } from "lodash";

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
