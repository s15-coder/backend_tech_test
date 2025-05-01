import Router from 'express';
import AuthRespository from '../features/auth/repository';
import AuthService from '../features/auth/service';
import AuthController from '../features/auth/controller';
// import { validateSignUp } from '../middlewares/validators/validate-sign-up';
const router = Router();

const authRespository = new AuthRespository();
const authService = new AuthService(authRespository);
const authController = new AuthController(authService);

router.post(
    '/sign-up',
    authController.register,
);

export default router;

