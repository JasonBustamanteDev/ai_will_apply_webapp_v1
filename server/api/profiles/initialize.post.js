import { getSupabaseClient, getSupabaseUserDetails } from "~/server/util/getSupabaseClient"; // prettier-ignore
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { MAX_PROFILES, PROFILES_TABLE_NAME, DEFAULT_SUCCESS_RETURN } from "~/server/util/server_constants"; // prettier-ignore

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const newProfileName = decodeURI(body.newProfileName);

        const { accessToken } = checkIfUserIsAuthenticated(event);
        const supabaseClient = getSupabaseClient(event, accessToken);
        const { auth_id } = await getSupabaseUserDetails(
            supabaseClient,
            accessToken
        );

        // Count how many profiles the user has
        const { count: profileCount, error: profileCountError } =
            await supabaseClient
                .from(PROFILES_TABLE_NAME)
                .select("*", { count: "exact" });

        if (profileCountError) {
            setResponseStatus(event, 500);
            return {
                detail: `Error occurred when counting how many profiles the user has: ${profileCountError?.message || ""}`, // prettier-ignore
            };
        }

        // If the user has the maximum amount, rejject the request
        if (profileCount >= MAX_PROFILES) {
            setResponseStatus(event, 422);
            return {
                detail: `The max number of profiles have been used (${MAX_PROFILES}). Delete a profile before creating a new one`,
            };
        }

        // Insert the new profile
        const { error: insertError } = await supabaseClient
            .from(PROFILES_TABLE_NAME)
            .insert({ id: auth_id, profileName: newProfileName });

        // An error will occur if a duplicate profile name is used already since it violates the table's UK constraint
        if (insertError) {
            setResponseStatus(event, 500);
            return {
                detail: `Error occurred when initializing new profile: ${insertError?.message || ""}`, // prettier-ignore
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
