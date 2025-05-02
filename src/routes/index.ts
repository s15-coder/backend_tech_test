import { Router } from 'express';

import authRouter from './auth';
import placesRouter from './places';

const router = Router();

router.use('/auth', authRouter);
router.use('/places', placesRouter);


export default router;
