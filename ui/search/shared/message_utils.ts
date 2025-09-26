import { get } from "lodash";

export const formatMessageForExtension = (
    description: string,
    data: Object
) => {
    return {
        description,
        data,
    };
};

export const flattenFormData = (data: Object) => {
    const formData = get(data, ["forms"]);
    const output = {};

    for (const formName in formData) {
        if (!formData[formName]["isComplete"]) continue;

        const rawData = formData[formName]["data"];

        switch (formName) {
            // Flattening logic is different for list forms with a dynamic length (ex. Languages. People can know 1 or 3)
            case PROFILE_FORMS.LANGUAGES:
                Object.assign(output, { languages: rawData });
                break;
            case PROFILE_FORMS.WORK_EXPERIENCE:
                Object.assign(output, { workExperience: rawData });
                break;
            case PROFILE_FORMS.SKILLS:
                Object.assign(output, { skills: rawData });
                break;
            // Flattening logic for forms with static length
            default:
                Object.assign(output, rawData);
                break;
        }
    }

    return output;
};
