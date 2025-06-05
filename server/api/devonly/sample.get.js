export default defineEventHandler(async (event) => {
    const env_config = useRuntimeConfig(event)
    
    console.log("jj7", env_config.SUPABASE_DB_PASSWORD)
    console.log("jj8", env_config.public.SUPABASE_PROJECT_URL)
    return { detail: "success" };
});