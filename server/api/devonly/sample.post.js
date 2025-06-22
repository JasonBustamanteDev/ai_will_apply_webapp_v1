import { authMiddleware } from "~/server/utils/authMiddleware";

export default defineEventHandler(async (event) => {
    authMiddleware(event);

    return { detail: "POST worked", result: 'decoded' };
});
