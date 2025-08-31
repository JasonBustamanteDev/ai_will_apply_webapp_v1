export type SkillObject = {
    name: string;
    years: number;
    nameError?: boolean;
};

export type NullableSkillList = SkillObject[] | null;

export type SkillList = SkillObject[];

export type SkillsRaw = {
    data: NullableSkillList;
    isComplete: boolean;
};
