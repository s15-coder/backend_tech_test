import { Router } from 'express';

import authRouter from './auth';
import placesRouter from './places';
import transactionRouter from './transaction';
import validateJwt from '../middlewares/validate-jwt';

const router = Router();

router.use('/auth', authRouter);
router.use('/places', validateJwt, placesRouter);
router.use('/transaction', validateJwt, transactionRouter);


export default router;
