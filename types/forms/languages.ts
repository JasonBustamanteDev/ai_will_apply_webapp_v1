export type LanguagesFormObject = {
    language: string;
    proficiency: string;
    langError?: boolean;
    proficiencyError?: boolean;
};

export type NullableLanguageList = LanguagesFormObject[] | null;

export type LanguagesFormRawData = {
    data: NullableLanguageList;
    isComplete: boolean;
};
