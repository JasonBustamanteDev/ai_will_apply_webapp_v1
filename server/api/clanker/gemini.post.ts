import { getSupabaseClient } from "~/server/util/getSupabaseClient";
import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";
import { detailObject, PROFILES_TABLE_NAME } from "~/server/util/server_constants"; // prettier-ignore

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event);
        const { accessToken } = checkIfUserIsAuthenticated(event);
        console.log(body)
        // const supabaseClient = getSupabaseClient(event, accessToken);


        return { detail: "successor", body };
    } catch (err: any) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || err?.message || "Something went wrong."; // prettier-ignore
        setResponseStatus(event, error_code);
        return detailObject(error_message);
    }
});
