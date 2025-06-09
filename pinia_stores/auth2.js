import { createClient } from "@supabase/supabase-js";
import { get } from "lodash";

export const useCompositionAuthStore = defineStore(
    "pinia_auth_composition",
    () => {
        const supabaseClient = ref(null);
        const currentSession = ref(null);
        const env = useRuntimeConfig();

        const initializeSupabaseClient = async () => {
            supabaseClient.value = createClient(
                env.public.SUPABASE_PROJECT_URL,
                env.public.SUPABASE_PUBLIC_ANON_API_KEY
            );
        };

        // Computed properties
        const sessionData = computed(() => {
            return {
                accessToken: get(currentSession.value, ["access_token"], null), // prettier-ignore
                providerToken: get(currentSession.value, ["provider_token"], null), // prettier-ignore
                refreshToken: get(currentSession.value, ["refresh_token"], null), // prettier-ignore
                tokenDetails: {
                    expiryTime: get(currentSession.value, ["expires_at"], null), // Fixed: should be expires_at
                    timeLimitInSeconds: get(
                        currentSession.value,
                        ["expires_in"],
                        null
                    ),
                },
            };
        });

        const isAuthenticated = computed(() => !!currentSession.value);

        const tokenExpiryTime = computed(() => {
            if (!currentSession.value?.expires_at) return null;
            return new Date(currentSession.value.expires_at * 1000);
        });

        const timeUntilExpiry = computed(() => {
            if (!tokenExpiryTime.value) return null;
            return tokenExpiryTime.value.getTime() - Date.now();
        });

        if (supabaseClient.value) {
            supabaseClient.value.auth.onAuthStateChange((event, session) => {
                console.log("wallahi", event);
            });
        }

        const googleSignIn = async () => {
            const { data, error } =
                await supabaseClient.value.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo: "http://localhost:4010/devonly/login", //! this cannot point to localhost in prod
                    },
                });
            if (error) {
                console.error("Problem signing into google");
                return;
            }
        };

        const googleSignOut = async () => {
            const { error } = await supabaseClient.value.auth.signOut();
            if (error) {
                console.error("Had trouble signing out of Google");
                return;
            }
        };

        const googleGetCurrentSession = async () => {
            const { data, error } =
                await supabaseClient.value.auth.getSession();
            if (error) {
                // Handle error
                console.error("Auth session failed", error);
            }
            currentSession.value = data;

            console.log("googleGetCurrentSession", data);
        };

        const googleRefreshSession = async () => {
            const { data, error } = await supabaseClient.value.auth.refreshSession(); // prettier-ignore
            const { session, user } = data;

            if (error) {
                // Handle error
                console.error("getNewSession failed", error);
            }
            currentSession.value = session;
        };

        return {
            readOnly: {
                sessionData,
                isAuthenticated,
            },
            methods: {
                initializeSupabaseClient,
                googleSignIn,
                googleSignOut,
                googleGetCurrentSession,
                googleRefreshSession,
            },
        };
    }
);
