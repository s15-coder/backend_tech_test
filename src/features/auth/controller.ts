import { Request, Response } from 'express';
import AuthService from './service';

export default class AuthController {

    constructor(private authService: AuthService) {
    }

    public signUp = async (req: Request, res: Response): Promise<void> => {
        const { email, password, name, phone } = req.body;
        try {

            const user = await this.authService.signUp(email, password, name, phone);
            if (!user) {
                res.status(400).json({ message: 'User already exists' });
                return;
            }
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }


}