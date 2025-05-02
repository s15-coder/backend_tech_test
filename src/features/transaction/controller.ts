import TransactionService from "./service";

export default class TransactionController {
    constructor(private transactionService: TransactionService) { }

    public createTransaction = async (req: any, res: any) => {
        try {

            const { description, amount } = req.body;

            const userId = req.userId;
            const transaction = await this.transactionService.createTransaction(description, amount, userId);
            if (transaction) {
                return res.status(201).json({ message: 'Transaction created successfully' });
            } else {
                return res.status(400).json({ message: 'Failed to create transaction' });
            }
        } catch (error) {
            console.error('Error creating transaction:', error);
            return res.status(500).json({ error: 'Internal server error' });

        }
    };

    // public getTransactionById = async (req: any, res: any) => {
    //     try {
    //         const transactionId = parseInt(req.params.id);
    //         const transaction = await this.transactionService.getTransactionById(transactionId);
    //         if (!transaction) {
    //             return res.status(404).json({ message: 'Transaction not found' });
    //         }
    //         return res.status(200).json(transaction);
    //     } catch (error) {
    //         return res.status(500).json({ error: error.message });
    //     }
    // };

    // public getTransactionsHistory = async (req: any, res: any) => {
    //     try {
    //         const userId = req.user.id;
    //         const transactions = await this.transactionService.getTransactionsHistory(userId);
    //         return res.status(200).json(transactions);
    //     } catch (error) {
    //         return res.status(500).json({ error: error.message });
    //     }
    // };
}