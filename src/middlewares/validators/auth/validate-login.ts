import { check } from "express-validator";
import { validateRequest } from "../validate-request";

export const validateLogin = [
    check("email")
        .isEmail()
        .withMessage("Invalid email format")
        .normalizeEmail(),
    check("password")
        .notEmpty()
        .withMessage("Password is required"),
    validateRequest,
]