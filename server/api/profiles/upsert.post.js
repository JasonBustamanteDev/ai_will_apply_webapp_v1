import { getSupabaseClient, getSupabaseUserDetails } from "~/server/util/getSupabaseClient"; // prettier-ignore
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { getCurrentUTCTimestamp } from "~/shared/server_helpers.js";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const supabaseClient = getSupabaseClient(event, accessToken);
        const { auth_id } = await getSupabaseUserDetails(
            supabaseClient,
            accessToken
        );

        const uploadObject = {
            id: auth_id,
            profileName: body.profileName,
            updated_at: getCurrentUTCTimestamp(),
        };

        for (const formName in body.formData) {
            uploadObject[formName] = { data: body.formData[formName] };
        }

        const { data, error } = await supabaseClient
            .from("jobSearchProfiles")
            .upsert(uploadObject)
            .select();

        if (error) {
            console.log(error);
            setResponseStatus(event, 500);
            return {
                detail: `Error occurred when upserting profile data: ${
                    error?.message || ""
                }`,
                data: null,
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
