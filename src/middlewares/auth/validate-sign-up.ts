import { check } from "express-validator";
import { validateRequest } from "../validate-request";

export const validateSignUp = [
    check('phone')
        .matches(/^\+57\d{10}$/)
        .withMessage('Invalid Colombian phone number'),
    check('email')
        .isEmail()
        .withMessage('Invalid email format')
        .normalizeEmail(),
    check('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Name must be at least 3 characters'),
    check('password')
        .isStrongPassword()
        .withMessage('Insecure password'),
    validateRequest,
];