import { createClient } from "@supabase/supabase-js";

export const getSupabaseClient = (event, accessToken) => {
    const env_config = useRuntimeConfig(event);

    return createClient(
        env_config.public.SUPABASE_PROJECT_URL,
        env_config.public.SUPABASE_PUBLIC_ANON_API_KEY,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            },
        }
    );
};
