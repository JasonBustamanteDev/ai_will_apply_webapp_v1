import { authMiddleware } from "~/server/utils/authMiddleware";

export default defineEventHandler(async (event) => {
    try {
        authMiddleware(event);
        return { detail: "POST worked", result: "decoded" };
    } catch (err) {
        //! Handle error. Make sure to send a similar response object compared to success, with ane rror code 
    }
});
