import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';


// Extend the Request interface to include user property
declare module 'express-serve-static-core' {
    interface Request {
        userId: string;
    }
}

const validateJwt = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization');

    if (!token) {
        res.status(401).json({ msg: 'No token, authorization denied' });
        return;
    }
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET as string);
        const { id: userId } = payload as { id: string };
        req.userId = userId;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

export default validateJwt;