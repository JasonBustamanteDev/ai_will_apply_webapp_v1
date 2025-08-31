type SocialsSchema = {
    portfolioUrl?: string;
    linkedin?: string;
    github?: string;
    twitter?: string;
    instagram?: string;
    tiktok?: string;
    youtube?: string;
};

type NullableSocialsSchema = SocialsSchema | null;

type SocialsRaw = {
    data: NullableSocialsSchema;
    isComplete: boolean;
};

export type { SocialsSchema, SocialsRaw };
