import { createClient } from "@supabase/supabase-js";

export default defineEventHandler(async (event) => {
    const env_config = useRuntimeConfig(event);
    try {
        // 1. Verify the request is actually coming from Vercel Cron
        const authHeader = getHeader(event, "authorization");

        if (authHeader !== `Bearer ${env_config.CRON_SECRET}`) {
            throw createError({
                statusCode: 401,
                statusMessage: "Unauthorized",
            });
        }

        // 2. Add your cron job logic here
        const supabaseClient = createClient(
            env_config.public.SUPABASE_PROJECT_URL || "",
            env_config.SUPABASE_SERVICE_ROLE_SECRET || "",
        );
        const { count, error } = await supabaseClient
            .from("jobSearchProfiles")
            .select("*", { count: "exact", head: true });
        console.log("There are currently " + count + " profiles on the app");

        return { cron_success: true, count };
    } catch (err: any) {
        console.log(err);
        return { detail: err.message };
    }
});
