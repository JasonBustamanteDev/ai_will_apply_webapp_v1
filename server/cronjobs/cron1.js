import dotenv from 'dotenv';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from "@supabase/supabase-js";

// Point dotenv to root directory where your .env files are
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

export async function cron() {
    try {
        // Count how many profile rows there are
        const supabaseClient = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_SERVICE_ROLE_SECRET)

        const { count, error } = await supabaseClient
            .from("jobSearchProfiles")
            .select("*", { count: "exact", head: true });

        console.log("There are currently " + count + " profiles on the app");

        return { cron_success: true, count };
    } catch (err) {
        console.log(err)
        return { detail: "cronjob failed for reasons i should log"};
    }
}

// Execute function
await cron()