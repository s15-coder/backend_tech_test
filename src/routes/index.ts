import { Router } from 'express';

import authRouter from './auth';
import placesRouter from './places';
import transactionRouter from './transaction';

const router = Router();

router.use('/auth', authRouter);
router.use('/places', placesRouter);
router.use('/transaction', transactionRouter);


export default router;
