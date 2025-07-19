import { getSupabaseClient, getSupabaseUserDetails } from "~/server/util/getSupabaseClient"; // prettier-ignore
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { PROFILES_TABLE_NAME, getCurrentUTCTimestamp, DEFAULT_SUCCESS_RETURN } from "~/server/util/server_constants"; // prettier-ignore

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const supabaseClient = getSupabaseClient(event, accessToken);
        const { auth_id } = await getSupabaseUserDetails(
            supabaseClient,
            accessToken
        );

        const uploadObject = { updatedAt: getCurrentUTCTimestamp() };
        for (const formName in body.formData) {
            uploadObject[formName] = body.formData[formName];
        }

        const { error } = await supabaseClient
            .from(PROFILES_TABLE_NAME)
            .update(uploadObject)
            .eq("id", auth_id)
            .eq("profileName", body.profileName);

        if (error) {
            setResponseStatus(event, 500);
            return {
                detail: `Error occurred when saving profile data: ${
                    error?.message || ""
                }`,
                data: null,
            };
        }

        return DEFAULT_SUCCESS_RETURN;
    } catch (err) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong"; // prettier-ignore
        setResponseStatus(event, error_code);
        return { detail: error_message };
    }
});
