import { useSupabaseAuthStore } from "~/pinia_stores/supabase_auth";

export default defineNuxtRouteMiddleware((to, from) => {
    // If user is authenticated, redirect to dashboard page
    const authStore = useSupabaseAuthStore();
    if (authStore.computed.isAuthenticated === true) {
        return navigateTo(PAGE_URLS.DASHBOARD);
    }
});
