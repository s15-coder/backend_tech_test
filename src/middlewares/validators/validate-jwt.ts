import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');
    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
        return;
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET as string);
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

export default validateJwt;