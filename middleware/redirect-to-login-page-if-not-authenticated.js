import { getCurrentUnixTimestamp } from "@/shared/time/helper_methods.js";
import jwt from "jsonwebtoken";

export default defineNuxtRouteMiddleware((to, from) => {
    const auth_cookie = useCookie(AUTH_STRINGS.AUTH_COOKIE_NAME);
    const sessionData = auth_cookie.value;

    // If no cookies are present, redirect user to login page
    if (!sessionData) {
        return navigateTo(PAGE_URLS.LOGIN);
    }

    // Verify JWT
    const env_config = useRuntimeConfig();
    const decoded = jwt.verify(
        sessionData.access_token,
        env_config.SUPABASE_JWT_SECRET
    );
    const isAuthenticated = decoded.aud === "authenticated";
    const isNotExpired = decoded.exp > getCurrentUnixTimestamp();
    const issuerMatchesSupabaseProject =
        decoded.iss === `${env_config.public.SUPABASE_PROJECT_URL}/auth/v1`;

    // If JWT is valid, do not redirect
    if (issuerMatchesSupabaseProject && isNotExpired && isAuthenticated) {
        return
    }

    // If JWT is invalid, clear cookie and redirect to login page
    auth_cookie.value = null;
    return navigateTo(PAGE_URLS.LOGIN);
});
