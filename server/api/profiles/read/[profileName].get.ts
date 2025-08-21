import { getSupabaseClient } from "~/server/util/getSupabaseClient";
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { detailObject, PROFILES_TABLE_NAME } from "~/server/util/server_constants"; // prettier-ignore

export default defineEventHandler(async (event) => {
    try {
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const supabaseClient = getSupabaseClient(event, accessToken);
        const encodedProfileName = getRouterParam(event, "profileName");

        if (encodedProfileName === undefined) {
            setResponseStatus(event, 500);
            return detailObject("Error. No encoded profile name submitted");
        }

        const decodedProfileName = decodeURI(encodedProfileName);

        // RLS policy applies a WHERE clause automatically (a user can only search through docs with their own uid)
        const { data, error } = await supabaseClient
            .from(PROFILES_TABLE_NAME)
            .select("*")
            .eq("profileName", decodedProfileName);

        if (error) {
            setResponseStatus(event, 500);
            return detailObject(
                "Error occurred when fetching single profile's data."
            );
        }

        return { detail: "success", data: data[0] };
    } catch (err: any) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong."; // prettier-ignore
        setResponseStatus(event, error_code);
        return detailObject(error_message);
    }
});
