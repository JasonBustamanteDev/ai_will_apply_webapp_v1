import { getSupabaseClient, getSupabaseUserDetails } from "~/server/util/getSupabaseClient"; // prettier-ignore
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { getCurrentUTCTimestamp } from "~/shared/server_helpers.js";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const supabaseClient = getSupabaseClient(event, accessToken);
        const { auth_id } = await getSupabaseUserDetails(supabaseClient, accessToken)

        const uploadObject = {
            id: auth_id,
            updated_at: getCurrentUTCTimestamp(),
            
        }
        

        const { data, error } = await supabaseClient
            .from("jobSearchProfiles")
            .upsert({ id: 1, name: 'piano' })
            .select()

        // if (error) {
        //     setResponseStatus(event, 500);
        //     return {
        //         detail: "Error occurred when fetching profile data",
        //         data: null,
        //     };
        // }

        return { detail: "success", uploadObject };
    } catch (err) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong"; // prettier-ignore
        setResponseStatus(event, error_code);
        return { detail: error_message, data: null };
    }
});
