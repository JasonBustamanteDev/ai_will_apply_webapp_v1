import { getSupabaseClient } from "~/server/util/getSupabaseClient";
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { detailObject, PROFILES_TABLE_NAME } from "~/server/util/server_constants"; // prettier-ignore

export default defineEventHandler(async (event) => {
    try {
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const supabaseClient = getSupabaseClient(event, accessToken);

        // RLS policy applies a WHERE clause automatically: where id = auth_id
        const { data, error } = await supabaseClient
            .from(PROFILES_TABLE_NAME)
            .select("*")
            .order("createdAt", { ascending: true });

        if (error) {
            setResponseStatus(event, 500);
            return detailObject("Error occurred when reading profile data.");
        }

        return { detail: "success", data };
    } catch (err) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong."; // prettier-ignore
        setResponseStatus(event, error_code);
        return detailObject(error_message);
    }
});
