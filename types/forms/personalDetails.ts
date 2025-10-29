type PersonalDetailsSchema = {
    firstName?: string;
    lastName?: string;
    age?: number;
    yearsOfExperience?: number;
    requireSponsorship: boolean;
    email?: string;
    gender?: string;
    phoneNumber?: string;
    ethnicity?: string;
    securityClearance?: boolean;
    disability?: boolean;
    educationLevel?: string;
};

type NullablePersonalDetails = PersonalDetailsSchema | null;

type PersonalDetailsRaw = {
    data: NullablePersonalDetails;
    isComplete: boolean;
};

export type { PersonalDetailsSchema, PersonalDetailsRaw };
