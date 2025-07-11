import { getSupabaseClient } from "~/server/util/getSupabaseClient";

export default defineEventHandler(async (event) => {
    const supabaseClient = getSupabaseClient();
    const { data, error } = await supabaseClient.from("jobSearchProfiles").select('*');
    console.log(error)
    return { detail: "successu", data };
});
