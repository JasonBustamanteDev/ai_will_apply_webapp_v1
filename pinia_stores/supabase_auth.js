import { createClient } from "@supabase/supabase-js";

export const useSupabaseAuthStore = defineStore(
    "pinia_auth_composition",
    () => {
        const env = useRuntimeConfig();
        const supabaseClient = ref(
            createClient(
                env.public.SUPABASE_PROJECT_URL,
                env.public.SUPABASE_PUBLIC_ANON_API_KEY
            )
        );

        const currentSession = ref(null);
        const isAuthenticated = computed(() => !!currentSession.value);

        // The following callback function fires each time an auth event goes off
        supabaseClient.value.auth.onAuthStateChange((event, session) => {
            console.log("session val", session);
            currentSession.value = session;

            switch (event) {
                case "INITIAL_SESSION":
                    console.log("initial session");
                    break;
                case "SIGNED_IN":
                    console.log("Signed into aiwillapply");
                    const cookieName = "awa_auth";
                    const cookieValue = session;

                    const cookie = useCookie(cookieName);
                    cookie.value = cookieValue;

                    break;
                case "SIGNED_OUT":
                    console.log("Signed out of aiwillapply");
                    break;
                case "PASSWORD_RECOVERY":
                    break;
                case "TOKEN_REFRESHED":
                    console.log("token refreshed");
                    break;
                case "USER_UPDATED":
                    console.log("user updated");
                    break;
            }
        });

        const googleSignIn = async () => {
            const { data, error } =
                await supabaseClient.value.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                        redirectTo: `${env.public.BASE_URL}/devonly/authplayground`,
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
            // Checking session does not always make a request in the Network tab (can use frequently)
            const { data, error } =
                await supabaseClient.value.auth.getSession();
            if (error) {
                // Handle error
                console.error("Auth session failed", error);
            }
            currentSession.value = data.session;
            console.log("googleGetCurrentSession ", data.session);
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
            state: {
                currentSession,
            },
            computed: {
                isAuthenticated,
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

// TODO: add error handling for these methods
// https://masteringnuxt.com/blog/how-to-use-error-handling-to-create-rock-solid-apps
// test out flows on http://localhost:4010/devonly/authplayground
