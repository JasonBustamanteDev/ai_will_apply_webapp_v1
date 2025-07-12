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

export const getSupabaseUserDetails = async (supabaseClient, accessToken) => {
    const { data: { user }, error } = await supabaseClient.auth.getUser(accessToken); // prettier-ignore

    if (error) {
        throw {
            statusCode: 500,
            statusMessage: "Something went wrong when fetching user auth data",
        };
    }
    
    return {
        auth_id: user.id,
        email: user.email,
        name: user.user_metadata.name,
    };
};
