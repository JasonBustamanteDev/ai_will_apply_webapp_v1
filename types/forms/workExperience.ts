export type JobExperienceObject = {
    jobTitle: string;
    company: string;
    years: number | string;
    currentlyThere: "yes" | "no";

    jobTitleError?: boolean;
    companyError?: boolean;
    yearsError?: boolean;
    currentlyThereError?: boolean;
};

export type NullableWorkExperienceList = JobExperienceObject[] | null;

export type WorkExperienceRaw = {
    data: NullableWorkExperienceList;
    isComplete: boolean;
};
