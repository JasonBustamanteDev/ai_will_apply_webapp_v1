import { useSupabaseAuthStore } from "~/pinia_stores/supabase_auth";

export default defineNuxtRouteMiddleware((to, from) => {
    const authStore = useSupabaseAuthStore();
    if (authStore.computed.isAuthenticated === false) {
        return navigateTo("/");
    }
});
