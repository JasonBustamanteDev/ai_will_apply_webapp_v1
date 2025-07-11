import { authMiddleware } from "./authMiddleware.js";

export const paidUserMiddleware = (event) => {
    // Check to see if user is authenticated first
    authMiddleware(event);
    try {
        // TODO
        // Check the table that contains details about user plans (plan, pay_method, expiration date)
    } catch (err) {}
};
