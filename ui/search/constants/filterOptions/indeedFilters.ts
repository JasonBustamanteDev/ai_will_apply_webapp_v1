// FUTURE FEATURE: Indeed pay filter is dynamic. If you put "engineer" vs "cashier", the salary numbers are wildly different
// Need an additional step if you want to apply this filter ()
export const INDEED_FILTER_OPTIONS = {
    REMOTE: [
        { label: "All jobs", value: "all" },
        { label: "Hybrid work", value: "hybrid" },
        { label: "Remote", value: "remote" },
    ],
    DATE_POSTED: [
        { label: "Any", value: "any" }, // UNOFFICIAL OPTION (means do not apply filter)
        { label: "Unseen jobs", value: "unseen" }, // doesn't always show for some reason
        { label: "Last 24 hours", value: "last_24_hours" },
        { label: "Last 3 days", value: "last_3_days" },
        { label: "Last 7 days", value: "last_7_days" },
        { label: "Last 14 days", value: "last_14_days" },
    ],
    JOB_TYPE: [
        { label: "Any", value: "any" }, // UNOFFICIAL OPTION (means do not apply filter)
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
        // We make this filter mandatory since the site seems to always apply one
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

export type OptionObject = (typeof INDEED_FILTER_OPTIONS.DATE_POSTED)[number];

export interface IndeedSearchPayload {
    role: string;
    jobLocation: string;
    profileName: string;

    datePosted: string;
    remote: string;
    distance: string;
    jobType: OptionObject[];
}
