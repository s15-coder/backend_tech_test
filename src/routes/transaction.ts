import { Router } from 'express';
import TransactionRespository from '../features/transaction/repository';
import TransactionService from '../features/transaction/service';
import TransactionController from '../features/transaction/controller';
import { validateCreateTransaction } from '../middlewares/validators/transaction/validate-create-transaction';
import { validatePaginationParams } from '../middlewares/validators/transaction/validate-pagination-params';

const router = Router()
const transactionRespository = new TransactionRespository();
const transactionService = new TransactionService(transactionRespository);
const transactionController = new TransactionController(transactionService);

router.post(
    '/create-transaction',
    validateCreateTransaction,
    transactionController.createTransaction,
);

router.get(
    '/get-transactions',
    validatePaginationParams,
    transactionController.getTransactions,
);

export default router;

