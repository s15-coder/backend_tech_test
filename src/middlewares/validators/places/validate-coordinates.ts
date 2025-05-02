import { Request, Response, NextFunction } from 'express';
import { check } from 'express-validator';
import { validateRequest } from '../validate-request';

const validateCoordinates = [
    check('latitude').isFloat({ min: -90, max: 90 }).withMessage('Invalida latitude'),
    check('longitude').isFloat({ min: -180, max: 180 }).withMessage('Invalida longitude'),
    validateRequest,
];

export default validateCoordinates;