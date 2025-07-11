import jwt from "jsonwebtoken";

export const checkIfUserIsAuthenticated = (event) => {
    try {
        // Extract bearer token from headers
        let accessToken = getHeader(event, "authorization");
        if (accessToken && accessToken.startsWith("Bearer ")) {
            accessToken = accessToken.slice(7);
        }

        // Verify JWT
        const env_config = useRuntimeConfig();
        const decoded = jwt.verify(accessToken, env_config.SUPABASE_JWT_SECRET);

        const currentUnix = Math.floor(Date.now() / 1000);
        const isAuthenticated = decoded.aud === "authenticated";
        const isNotExpired = decoded.exp > currentUnix;
        const issuerMatchesSupabaseProject =
            decoded.iss === `${env_config.public.SUPABASE_PROJECT_URL}/auth/v1`;

        // Throw an error if the JWT is invalid for any reason
        if (
            !isAuthenticated ||
            !isNotExpired ||
            !issuerMatchesSupabaseProject
        ) {
            throw createError({
                statusCode: 401,
                statusMessage: "JWT is not valid",
            });
        }

        return { accessToken };
    } catch (err) {
        // If an error occurs while inspecting the JWT, raise an error for your middleware
        throw createError({
            statusCode: 400,
            statusMessage: `JWT verification failed. ${err?.message || ""}`,
        });
    }
};
