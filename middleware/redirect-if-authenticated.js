import { useSupabaseAuthStore } from "~/pinia_stores/supabase_auth";

export default defineNuxtRouteMiddleware((to, from) => {
    // If user is not authenticated, redirect to login page
    const authStore = useSupabaseAuthStore();
    if (authStore.computed.isAuthenticated === false) {
        return navigateTo(PAGE_URLS.LOGIN);
    }
});
