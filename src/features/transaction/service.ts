import { TransactionsResponse } from "../../types/dto/transactions-response";
import AppTransaction from "../../types/model/app_transaction.entity";
import TransactionRepository from "./repository";

export default class TransactionService {

    constructor(private transactionRepository: TransactionRepository) { }

    public createTransaction = async (
        description: string,
        amount: number,
        userId: number
    ): Promise<boolean> => {
        return await this.transactionRepository.createTransaction(description, amount, userId);
    }

    public getTransactions = async (
        userId: number,
        page: string | undefined,
        limit: string | undefined
    ): Promise<TransactionsResponse> => {
        // Default to page 1 and limit 10 if not provided
        const pageNumber = page ? parseInt(page as string) : 1;
        const limitNumber = limit ? parseInt(limit as string) : 10;
        return await this.transactionRepository.getTransactions(userId, pageNumber, limitNumber);
    }

}