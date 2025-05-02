import { check } from "express-validator";
import { validateRequest } from "../validate-request";

export const validateCreateTransaction = [
    check('description')
        .isLength({ max: 100 })
        .isString()
        .withMessage('Invalid description'),
    check('amount')
        .isNumeric()
        .withMessage('Amount is required'),
    validateRequest,
]