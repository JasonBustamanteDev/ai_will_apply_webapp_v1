import { createClient } from "@supabase/supabase-js";
import { get } from "lodash";

export const useAuthStore = defineStore("pinia_auth", {
    state: () => ({
        supabaseClient: null,
        currentSession: null,
        authData: null,
    }),
    getters: {
        userData: (state) => {
            return get(state.currentSession, ["user"]);
        },
        isAuthenticated: (state) => {
            return !!state.currentSession;
        },
        accessToken: (state) => {
            return get(state.currentSession, ["access_token"]);
        },
        providerToken: (state) => {
            return get(state.currentSession, ["provider_token"]);
        },
        refreshToken: (state) => {
            return get(state.currentSession, ["refresh_token"]);
        },
        tokenExpiryDetails: (state) => {
            return {
                expiryTime: get(state.currentSession, ["refresh_token"]),
                timeLimitInSeconds: get(state.currentSession, ["expires_in"]),
            };
        },
    },
    actions: {
        async initializeSupabaseClient() {
            const env = useRuntimeConfig();
            const supabaseClient = createClient(
                env.public.SUPABASE_PROJECT_URL,
                env.public.SUPABASE_PUBLIC_ANON_API_KEY
            );
            this.supabaseClient = supabaseClient;
        },

        async googleSignIn() {
            const { data, error } =
                await this.supabaseClient.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo: "http://localhost:4010/devonly/login", //! this cannot point to localhost in prod
                    },
                });
            if (error) {
                console.error("Problem signing into google");
                return;
            }
            this.userAuthData = data;
        },

        async googleSignOut() {
            const { error } = await this.supabaseClient.auth.signOut();
            if (error) {
                console.error("Had trouble signing out of Google");
                return;
            }
        },

        async googleGetCurrentSession() {
            const { data, error } = await this.supabaseClient.auth.getSession();
            if (error) {
                // Handle error
                console.error("Auth session failed", error);
            }
            this.currentSession = data;
            console.log(data)
        },

        async googleRefreshSession() {
            const { data, error } = await this.supabaseClient.auth.refreshSession(); // prettier-ignore
            const { session, user } = data;

            if (error) {
                // Handle error
                console.error("getNewSession failed", error);
            }
            this.currentSession = session;
            this.userAuthData = user;
        },
    },
});

//! TODO add error handling in case Supabase client fails to start up
