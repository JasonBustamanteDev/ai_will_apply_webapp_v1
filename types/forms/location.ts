type LocationSchema = {
    country?: string;
    address?: string;
    city?: string;
    postalCode?: string;
    provinceState?: string;
    citizenship?: string;
};

type NullableLocation = LocationSchema | null;

type LocationRaw = {
    data: NullableLocation;
    isComplete: boolean;
};

export type { LocationRaw };
