import { getSupabaseClient, getSupabaseUserDetails } from "~/server/util/getSupabaseClient"; // prettier-ignore
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { getCurrentUTCTimestamp } from "~/shared/server_helpers.js";
import {
    MAX_PROFILES,
    PROFILES_TABLE_NAME,
} from "~/server/util/server_globals";

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { accessToken } = checkIfUserIsAuthenticated(event);
        const supabaseClient = getSupabaseClient(event, accessToken);
        const { auth_id } = await getSupabaseUserDetails(
            supabaseClient,
            accessToken
        );

        // Ensure the user hasn't exceeded their max number of profiles
        const {
            count: profileCount,
            error: profileCountError,
            data: profileCountData,
        } = await supabaseClient
            .from(PROFILES_TABLE_NAME)
            .select("*", { count: "exact" });

        if (profileCount >= MAX_PROFILES) {
            setResponseStatus(event, 422);
            return {
                detail: `The max number of profiles have been used (${MAX_PROFILES}). Delete a profile before creating a new one`,
            };
        }

        if (profileCountError) {
            setResponseStatus(event, 500);
            return {
                detail: `Error occurred when counting how many profiles the user has: ${profileCountError?.message || ""}`, // prettier-ignore
            };
        }

        const { error: insertError } = await supabaseClient
            .from(PROFILES_TABLE_NAME)
            .insert({ id: auth_id, profileName: body.profileName });

        if (insertError) {
            setResponseStatus(event, 500);
            return {
                detail: `Error occurred when initializing new profile: ${insertError?.message || ""}`, // prettier-ignore
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
