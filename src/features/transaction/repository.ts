import { AppDataSource } from "../../config/database";
import { TransactionsResponse } from "../../types/dto/transactions-response";
import AppTransaction from "../../types/model/app_transaction.entity";
import AppUser from "../../types/model/app_user.entity";

export default class TransactionRepository {

    public createTransaction = async (
        description: string,
        amount: number,
        userId: number
    ): Promise<any> => {
        const transaction = new AppTransaction();
        transaction.description = description;
        transaction.amount = amount;
        transaction.transactionDate = new Date();
        const appUser = new AppUser();
        appUser.id = userId;
        transaction.appUser = appUser;
        await AppDataSource.getRepository(AppTransaction).save(transaction);
        return transaction;
    }

    public getTransactions = async (
        userId: number,
        page: number,
        limit: number
    ): Promise<TransactionsResponse> => {
        const offset = (page - 1) * limit;
        const whereQuery = { appUser: { id: userId } };
        const transactions = await AppDataSource.getRepository(AppTransaction)
            .find({
                where: whereQuery,
                skip: offset,
                take: limit,
                order: { transactionDate: 'DESC' },
            });
        const totalTransactions = await AppDataSource.getRepository(AppTransaction)
            .count({
                where: whereQuery,
            });
        const totalPages = Math.ceil(totalTransactions / limit);

        const transactionsResponse: TransactionsResponse = {
            transactions,
            totalPages,
            currentPage: page,
        };

        return transactionsResponse;
    }
}