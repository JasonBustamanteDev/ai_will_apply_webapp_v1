import { getSupabaseClient } from "~/server/util/getSupabaseClient";
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { detailObj, PROFILES_TABLE_NAME } from "~/server/util/server_constants"; // prettier-ignore

export default defineEventHandler(async (event) => {
    try {
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const supabaseClient = getSupabaseClient(event, accessToken);
        const profileName = decodeURI(getRouterParam(event, "profileName"));

        // RLS policy applies a WHERE clause automatically (a user can only search through docs with their own uid)
        const { data, error } = await supabaseClient
            .from(PROFILES_TABLE_NAME)
            .select("*")
            .eq("profileName", profileName);

        if (error) {
            setResponseStatus(event, 500);
            return {
                detail: "Error occurred when fetching single profile's data.",
            };
        }

        return { detail: "success", data: data[0] };
    } catch (err) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong."; // prettier-ignore
        setResponseStatus(event, error_code);
        return { detail: error_message };
    }
});
