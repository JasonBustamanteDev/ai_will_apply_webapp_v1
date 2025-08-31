type EducationSchema = {
    haveHigherEducation: boolean;
    institutionName?: string;
    fieldOfStudy?: string;
    institutionCity?: string;
    institutionProvince?: string;
    gpa?: string | number;
    startDate?: string;
    endDate?: string;
    currentlyAttending?: boolean;
};

type NullableEducation = EducationSchema | null;

type EducationRaw = {
    data: NullableEducation;
    isComplete: boolean;
};

export type { EducationRaw, EducationSchema };
