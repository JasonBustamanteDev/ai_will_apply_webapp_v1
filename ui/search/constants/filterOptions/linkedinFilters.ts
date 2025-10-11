// tech_debt_need_match_11ASDF
// We need to match values with certain sections of the chrome extension
export const LINKEDIN_FILTER_OPTIONS = {
    DATE_POSTED: [
        { label: "Any time", value: "Any time" },
        { label: "Past month", value: "Past month" },
        { label: "Past week", value: "Past week" },
        { label: "Past 24 hours", value: "Past 24 hours" },
    ],
    EXPERIENCE_LEVEL: [
        { label: "Any", value: "Any" }, // UNOFFICIAL OPTION (means do not apply filter)
        { label: "Internship", value: "Internship" },
        { label: "Entry level", value: "Entry level" },
        { label: "Associate", value: "Associate" },
        { label: "Mid-Senior level", value: "Mid-Senior level" },
        { label: "Director", value: "Director" },
        { label: "Executive", value: "Executive" },
    ],
    SALARY: [
        { label: "Any", value: "Any" }, // UNOFFICIAL OPTION (means do not apply filter)
        { label: "$40,000+", value: "$40,000+" },
        { label: "$60,000+", value: "$60,000+" },
        { label: "$80,000+", value: "$80,000+" },
        { label: "$100,000+", value: "$100,000+" },
        { label: "$120,000+", value: "$120,000+" },
        { label: "$140,000+", value: "$140,000+" },
        { label: "$160,000+", value: "$160,000+" },
        { label: "$180,000+", value: "$180,000+" },
        { label: "$200,000+", value: "$200,000+" },
    ],
    REMOTE: [
        { label: "Any", value: "Any" }, // UNOFFICIAL OPTION (means do not apply filter)
        { label: "Remote", value: "Remote" },
        { label: "On-site", value: "On-site" },
        { label: "Hybrid", value: "Hybrid" },
    ],
    JOB_TYPE: [
        { label: "Any", value: "Any" }, // UNOFFICIAL OPTION (means do not apply filter in extension)
        { label: "Full-time", value: "Full-time" },
        { label: "Part-time", value: "Part-time" },
        { label: "Contract", value: "Contract" },
        { label: "Temporary", value: "Temporary" },
        { label: "Volunteer", value: "Volunteer" },
        { label: "Internship", value: "Internship" },
        { label: "Other", value: "Other" },
    ]
};

export type OptionObject = (typeof LINKEDIN_FILTER_OPTIONS.DATE_POSTED)[number];

export interface LinkedInSearchPayload {
    role: string;
    jobLocation: string;
    profileName: string;

    datePosted: string;
    salary: string;
    experienceLevel: OptionObject[];
    remote: OptionObject[];
}
