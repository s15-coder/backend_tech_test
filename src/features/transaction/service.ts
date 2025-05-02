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

}