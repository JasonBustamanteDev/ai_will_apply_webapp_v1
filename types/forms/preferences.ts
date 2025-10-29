type PreferenceSchema = {
    currentAnnualSalary: number;
    expectedAnnualSalary: number;
    noticePeriod: number;
    willingToRelocate: boolean;
    driversLicense: boolean;
    reliableTransportation: boolean;
    veteranStatus: boolean;
    workAvailability: string;
    interviewAvailability: string;
    companyBlacklist: string[];
};

type NullablePreference = PreferenceSchema | null;

type PreferenceRaw = {
    data: NullablePreference;
    isComplete: boolean;
};

export type { PreferenceRaw };
