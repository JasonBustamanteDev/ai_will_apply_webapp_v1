import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    ssr: false,
    compatibilityDate: "2025-05-15",
    future: {
        compatibilityVersion: 4,
    },
    devtools: { enabled: true },
    devServer: {
        port: 4010,
    },
    experimental: {
        appManifest: false, // disables a dev.json GET request from being made on each page load
    },

    // vite and css required for daisyUI
    vite: {
        plugins: [tailwindcss()],
    },
    css: ["~/assets/app.css"],

    modules: [
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxt/image",
        "@nuxt/test-utils",
        "@nuxt/ui",
        "@pinia/nuxt",
        '@nuxt/test-utils/module'
    ],

    // TS
    typescript: {
        // Turns typechecks on/off when we deploy locally or build
        // We set it to false since vue-tsc has an issue where it type checks node_modules (even if we exclude it in tsconfig.json)
        typeCheck: false,
        
        strict: true,
    },

    runtimeConfig: {
        // Private keys (server-side only)
        SUPABASE_DB_PASSWORD: process.env.SUPABASE_DB_PASSWORD,
        SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
        SUPABASE_SERVICE_ROLE_SECRET: process.env.SUPABASE_SERVICE_ROLE_SECRET,
        GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
        GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,

        public: {
            // Public keys (available on both client and server)
            SUPABASE_PROJECT_URL: process.env.SUPABASE_PROJECT_URL,
            SUPABASE_PUBLIC_ANON_API_KEY:
                process.env.SUPABASE_PUBLIC_ANON_API_KEY,
            BASE_URL: process.env.BASE_URL,
        },
    },
});
