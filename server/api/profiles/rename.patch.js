import { getSupabaseClient, getSupabaseUserDetails } from "~/server/util/getSupabaseClient"; // prettier-ignore
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { PROFILES_TABLE_NAME, getCurrentUTCTimestamp, DEFAULT_SUCCESS_RETURN } from "~/server/util/server_constants"; // prettier-ignore

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const oldProfileName = decodeURI(body.oldProfileName);
        const newProfileName = decodeURI(body.newProfileName);
        if (newProfileName === oldProfileName) return { detail: "empty success" };

        const { accessToken } = checkIfUserIsAuthenticated(event);
        const supabaseClient = getSupabaseClient(event, accessToken);
        const { auth_id } = await getSupabaseUserDetails(
            supabaseClient,
            accessToken
        );

        const updateObject = {
            profileName: newProfileName,
            updatedAt: getCurrentUTCTimestamp(),
        };

        const { error } = await supabaseClient
            .from(PROFILES_TABLE_NAME)
            .update(updateObject)
            .eq("id", auth_id)
            .eq("profileName", oldProfileName);

        if (error) {
            setResponseStatus(event, 500);
            const msg = error.code == 23505 ? "Profile name already in use." : (error?.message || ""); // prettier-ignore
            return {
                detail: `Error occurred when renaming profile: ${msg}.`,
            };
        }

        return DEFAULT_SUCCESS_RETURN;
    } catch (err) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong."; // prettier-ignore
        setResponseStatus(event, error_code);
        return { detail: error_message };
    }
});
