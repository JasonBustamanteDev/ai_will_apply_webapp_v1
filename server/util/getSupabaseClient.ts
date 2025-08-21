import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { EventHandlerRequest, H3Event } from "h3";
import type { Database } from "~/types/supabase";

export const getSupabaseClient = (
    event: H3Event<EventHandlerRequest>,
    accessToken: string
) => {
    const env_config = useRuntimeConfig(event);

    return createClient<Database>(
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

export const getSupabaseUserDetails = async (
    supabaseClient: SupabaseClient,
    accessToken: string
) => {
    const {
        data: { user },
        error,
    } = await supabaseClient.auth.getUser(accessToken);

    if (error) {
        throw {
            statusCode: 500,
            statusMessage: "Something went wrong when fetching user auth data",
        };
    }
    if (user === null) {
        throw {
            statusCode: 500,
            statusMessage: "User not found by Supabase Client",
        };
    }

    return {
        auth_id: user.id,
        email: user.email,
        name: user.user_metadata.name,
    };
};
