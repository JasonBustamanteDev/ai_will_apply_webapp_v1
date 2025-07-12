import { getSupabaseClient } from "~/server/util/getSupabaseClient";
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";

export default defineEventHandler(async (event) => {
    try {
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const supabaseClient = getSupabaseClient(event, accessToken);
        const profileName = getRouterParam(event, "profileName");

        // RLS policy applies a WHERE clause automatically (a user can only search through docs with their own uid)
        const { error } = await supabaseClient
            .from("jobSearchProfiles")
            .delete()
            .eq("profileName", profileName);

        if (error) {
            setResponseStatus(event, 500);
            return {
                detail: "Error occurred when deleting profile data",
            };
        }

        return { detail: "success" };
    } catch (err) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong"; // prettier-ignore
        setResponseStatus(event, error_code);
        return { detail: error_message };
    }
});
