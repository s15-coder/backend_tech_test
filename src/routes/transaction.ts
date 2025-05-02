import { Router } from 'express';
import TransactionRespository from '../features/transaction/repository';
import TransactionService from '../features/transaction/service';
import TransactionController from '../features/transaction/controller';
import validateJwt from '../middlewares/validators/validate-jwt';
import { validateCreateTransaction } from '../middlewares/validators/transaction/validate-create-transaction';

const router = Router()
const transactionRespository = new TransactionRespository();
const transactionService = new TransactionService(transactionRespository);
const transactionController = new TransactionController(transactionService);

router.post(
    '/create-transaction',
    [
        validateJwt,
        ...validateCreateTransaction,
    ],
    transactionController.createTransaction,
);



export default router;

