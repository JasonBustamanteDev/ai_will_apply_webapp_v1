export const LINKEDIN_FILTER_OPTIONS = {
    DATE_POSTED: [
        { label: "Any time", value: "anytime" },
        { label: "Past month", value: "past_month" },
        { label: "Past week", value: "past_week" },
        { label: "Past 24 hours", value: "past_24_hours" },
    ],
    EXPERIENCE_LEVEL: [
        { label: "Internship", value: "internship" },
        { label: "Entry level", value: "entry_level" },
        { label: "Associate", value: "associate" },
        { label: "Mid-Senior level", value: "mid_senior_level" },
        { label: "Director", value: "director" },
        { label: "Executive", value: "executive" },
    ],
    SALARY: [
        { label: "$40,000+", value: "40000" },
        { label: "$60,000+", value: "60000" },
        { label: "$80,000+", value: "80000" },
        { label: "$100,000+", value: "100000" },
        { label: "$120,000+", value: "120000" },
        { label: "$140,000+", value: "140000" },
        { label: "$160,000+", value: "160000" },
        { label: "$180,000+", value: "180000" },
        { label: "$200,000+", value: "200000" },
    ],
    REMOTE: [
        { label: "Remote", value: "remote" },
        { label: "On-site", value: "on_site" },
        { label: "Hybrid", value: "hybrid" },
    ],
    JOB_TYPE: [
        // Only appears in all filters panel
        { label: "Full-time", value: "full_time" },
        { label: "Part-time", value: "part_time" },
        { label: "Contract", value: "contract" },
        { label: "Temporary", value: "temporary" },
        { label: "Volunteer", value: "volunteer" },
        { label: "Internship", value: "internship" },
        { label: "Other", value: "other" },
    ],
};

export type optionObject = typeof LINKEDIN_FILTER_OPTIONS.DATE_POSTED[number];