type PreferenceSchema = {
    currentAnnualSalary: number;
    expectedAnnualSalary: number;
    noticePeriod: number;
    willingToRelocate: boolean;
    driversLicense: boolean;
    reliableTransportation: boolean;
    veteranStatus: boolean;
    interviewAvailability: string;
    companyBlacklist: string[];
    redFlagWords: string[];
};

type NullablePreference = PreferenceSchema | null;

type PreferenceRaw = {
    data: NullablePreference;
    isComplete: boolean;
};

export type { PreferenceRaw };
