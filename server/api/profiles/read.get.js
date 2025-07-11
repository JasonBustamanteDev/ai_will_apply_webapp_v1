import { getSupabaseClient } from "~/server/util/getSupabaseClient";
import { checkIfUserIsAuthenticated } from "~/server/server_middleware/checkIfUserIsAuthenticated";

export default defineEventHandler(async (event) => {
    try {
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const supabaseClient = getSupabaseClient(event, accessToken);

        // RLS policy applies a WHERE clause automatically (filters by auth uid)
        const { data, error } = await supabaseClient
            .from("jobSearchProfiles")
            .select("*")
            .order("profileName", { ascending: false });

        if (error) {
            setResponseStatus(event, 500);
            return {
                detail: "Error occurred when fetching profile data",
                data: null,
            };
        }

        return { detail: "success", data };
    } catch (err) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong"; // prettier-ignore
        setResponseStatus(event, error_code);
        return { detail: error_message, data: null };
    }
});
