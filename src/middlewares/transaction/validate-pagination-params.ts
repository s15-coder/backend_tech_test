import { check } from "express-validator";
import { validateRequest } from "../validate-request";

export const validatePaginationParams = [
    check('page')
        .optional()
        .isNumeric()
        .withMessage('Page must be a number'),
    check('limit')
        .optional()
        .isNumeric()
        .withMessage('Limit must be a number'),
    validateRequest,
]