import Router from 'express';

import AuthRespository from '../features/auth/repository';
import AuthService from '../features/auth/service';
import AuthController from '../features/auth/controller';

import { validateSignUp } from '../middlewares/auth/validate-sign-up';
import PasswordEncryptionRepository from '../repository/password-encryption';
import { validateLogin } from '../middlewares/auth/validate-login';

const router = Router();

const authRespository = new AuthRespository();
const passwordEncryptionRepository = new PasswordEncryptionRepository();
const authService = new AuthService(authRespository, passwordEncryptionRepository);
const authController = new AuthController(authService);

router.post(
    '/sign-up',
    validateSignUp,
    authController.signUp,
);

router.post(
    '/login',
    validateLogin,
    authController.login,
);

export default router;

