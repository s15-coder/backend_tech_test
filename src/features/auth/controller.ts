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

    public login = async (req: Request, res: Response): Promise<void> => {
        const { email, password } = req.body;
        try {
            const loginResponse = await this.authService.login(email, password);

            if (!loginResponse) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }
            res.status(200).json(loginResponse);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}