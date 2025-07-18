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

export const isValidProfileName = (str) => {
    // String must be 1 char long, consist of alphanumeric chars, and not be entirely spaces
    return (
        str &&
        str.length > 0 &&
        str.trim().length > 0 &&
        /^[a-zA-Z0-9\s]+$/.test(str)
    );
};
