import { AppDataSource } from "../../config/database";
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
}