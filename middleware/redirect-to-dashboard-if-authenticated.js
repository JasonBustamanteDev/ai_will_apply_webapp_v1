import { getCurrentUnixTimestamp } from "@/shared/time/helper_methods.js";
import jwt from "jsonwebtoken";

export default defineNuxtRouteMiddleware((to, from) => {
    const auth_cookie = useCookie(AUTH_STRINGS.AUTH_COOKIE_NAME);
    const sessionData = auth_cookie.value;

    // If no cookie, allow passage to target url
    if (!sessionData) return;

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

    // If JWT is valid, redirect to dashboard instead of target URL
    if (issuerMatchesSupabaseProject && isNotExpired && isAuthenticated) {
        return navigateTo(PAGE_URLS.DASHBOARD);
    }

    // If JWT is invalid, clear cookie and allow passage to target url
    auth_cookie.value = null;
    return;
});
