import { getAuthSessionFromLocalStorage } from "~/shared/helper_methods";

// This runs on the client side since the file ends in .client.js
export default defineNuxtRouteMiddleware((to, from) => {
    const env_config = useRuntimeConfig();
    const session = getAuthSessionFromLocalStorage(
        env_config.public.SUPABASE_PROJECT_URL
    );

    if (!session) return navigateTo(PAGE_URLS.LOGIN);

    return;
});
