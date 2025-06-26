import { createClient } from "@supabase/supabase-js";
import { useCustomToast } from "@/pinia_stores/toast";

export const useSupabaseAuthStore = defineStore(
    "pinia_auth_composition",
    () => {
        const { showToast } = useCustomToast();
        const env = useRuntimeConfig();
        const supabaseClient = ref(
            createClient(
                env.public.SUPABASE_PROJECT_URL,
                env.public.SUPABASE_PUBLIC_ANON_API_KEY
            )
        );

        const currentSession = ref(null);
        const sessionExists = computed(() => !!currentSession.value);

        // The following callback function fires each time an auth event goes off
        supabaseClient.value.auth.onAuthStateChange((event, session) => {
            currentSession.value = session;

            switch (event) {
                // Emitted right after the Supabase client is constructed and the initial session from storage is loaded.
                case "INITIAL_SESSION":
                    break;
                case "SIGNED_IN":
                    break;
                case "SIGNED_OUT":
                    break;
                case "TOKEN_REFRESHED":
                    break;
                case "PASSWORD_RECOVERY":
                    break;
                case "USER_UPDATED":
                    break;
            }
        });

        const googleSignIn = async () => {
            try {
                const { data, error } =
                    await supabaseClient.value.auth.signInWithOAuth({
                        provider: "google",
                        options: {
                            redirectTo: `${env.public.BASE_URL}/devonly/authplayground`, //! dev only
                            // redirectTo: `${env.public.BASE_URL}/`, //! test if this works
                        },
                    });
                if (error) {
                    throwErrorObject(
                        "Google Sign In Error",
                        "Something went wrong while signing in with Google. Please reload and try again"
                    );
                }
            } catch (err) {
                showToast(
                    "Google Sign In Error",
                    err?.message || ERROR_MESSAGES.GENERIC
                );
            }
        };

        const googleSignOut = async () => {
            try {
                const { error } = await supabaseClient.value.auth.signOut();
                if (error) {
                    throwErrorObject(
                        "Google Sign Out Error",
                        "Something went wrong while signing out with Google. Please reload and try again"
                    );
                }
            } catch (err) {
                showToast(
                    "Google Sign Out Error",
                    err?.message || ERROR_MESSAGES.GENERIC
                );
            }
        };

        const googleGetCurrentSession = async () => {
            try {
                // Checking session does not always make a request in the Network tab (can use frequently)
                const { data, error } = await supabaseClient.value.auth.getSession(); // prettier-ignore
                if (error) {
                    throwErrorObject(
                        "Google Session Fetch Error",
                        "Something went wrong while retreiving session with Google. Please reload and try again"
                    );
                }
                currentSession.value = data.session;
            } catch (err) {
                showToast(
                    "Google Session Fetch Error",
                    err?.message || ERROR_MESSAGES.GENERIC
                );
            }
        };

        const googleRefreshSession = async () => {
            try {
                const { data, error } = await supabaseClient.value.auth.refreshSession(); // prettier-ignore
                const { session, user } = data;

                if (error) {
                    throwErrorObject(
                        "Google Refresh Session Error",
                        "Something went wrong while refreshing session with Google. Please reload and try again"
                    );
                }

                currentSession.value = session;
            } catch (err) {
                showToast(
                    "Google Refresh Session Error",
                    err?.message || ERROR_MESSAGES.GENERIC
                );
            }
        };

        return {
            state: {
                currentSession,
            },
            computed: {
                sessionExists: sessionExists,
            },
            methods: {
                googleSignIn,
                googleSignOut,
                googleGetCurrentSession,
                googleRefreshSession,
            },
        };
    }
);
