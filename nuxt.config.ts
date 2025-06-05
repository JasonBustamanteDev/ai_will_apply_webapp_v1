export default defineNuxtConfig({
    compatibilityDate: "2025-05-15",
    devtools: { enabled: true },

    modules: [
      "@nuxt/eslint",
      "@nuxt/fonts",
      "@nuxt/icon",
      "@nuxt/image",
      "@nuxt/test-utils",
      "@nuxt/ui",
      "@pinia/nuxt",
    ],

    runtimeConfig: {
        // Private keys (server-side only)
        SUPABASE_DB_PASSWORD: process.env.SUPABASE_DB_PASSWORD,
        SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
        SUPABASE_SERVICE_ROLE_SECRET: process.env.SUPABASE_SERVICE_ROLE_SECRET,

        public: {
            // Public keys (available on both client and server)
            SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
            SUPABASE_PUBLIC_API_KEY: process.env.SUPABASE_PUBLIC_API_KEY,
        },
    },
});