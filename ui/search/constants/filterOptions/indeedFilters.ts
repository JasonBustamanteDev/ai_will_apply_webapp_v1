export const LINKEDIN_FILTER_OPTIONS = {
    REMOTE: [
        { label: "All jobs", value: "all" },
        { label: "Hybrid work", value: "hybrid" },
        { label: "Remote", value: "remote" },
    ],
    DATE_POSTED: [
        { label: "Jobs you haven't seen", value: "unseen" },
        { label: "Last 24 hours", value: "last_24_hours" },
        { label: "Last 3 days", value: "last_3_days" },
        { label: "Last 7 days", value: "last_7_days" },
        { label: "Last 14 days", value: "last_14_days" },
    ],
    PAY: [
        { label: "All Salaries", value: "all" },
        { label: "$80,000+", value: "80000" },
        { label: "$100,000+", value: "100000" },
        { label: "$120,000+", value: "120000" },
        { label: "$140,000+", value: "140000" },
        { label: "$160,000+", value: "160000" },
    ],
    JOB_TYPE: [
        { label: "Full-time", value: "full_time" },
        { label: "Permanent", value: "permanent" },
        { label: "Temporary", value: "temporary" },
        { label: "Fixed term contract", value: "fixed_term_contract" },
        { label: "Contract", value: "contract" },
        { label: "Part-time", value: "part_time" },
        { label: "Internship / Co-op", value: "internship_coop" },
        { label: "Apprenticeship", value: "apprenticeship" },
    ],
    DISTANCE: [
        // Does not always appear on page for some reason
        { label: "Exact location only", value: "exact" },
        { label: "Within 5 kilometres", value: "5" },
        { label: "Within 10 kilometres", value: "10" },
        { label: "Within 15 kilometres", value: "15" },
        { label: "Within 25 kilometres", value: "25" },
        { label: "Within 35 kilometres", value: "35" },
        { label: "Within 50 kilometres", value: "50" },
        { label: "Within 100 kilometres", value: "100" },
    ],
};
