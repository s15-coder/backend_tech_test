import { Request, Response } from 'express';
import AuthService from './service';

export default class AuthController {
    constructor(private authService: AuthService) {
    }


    public register = async (req: Request, res: Response): Promise<void> => {
        try {
            const { email, password } = req.body;
            const user = await this.authService.register(email, password);
            res.status(201).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    }


}