import { checkIfUserIsAuthenticated } from "~/server/manual_middleware/checkIfUserIsAuthenticated";

export default defineEventHandler(async (event) => {
    try {
        checkIfUserIsAuthenticated(event);
        return { detail: "POST worked", result: "decoded" };
    } catch (err) {
        const error_code = err?.statusCode || 500;
        const error_message = err?.statusMessage || "Something went wrong";
        setResponseStatus(event, error_code);
        return { detail: error_message, data: null };
    }
});
