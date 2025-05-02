import { Request, Response } from "express";
import TransactionService from "./service";

export default class TransactionController {
    constructor(private transactionService: TransactionService) { }

    public createTransaction = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        try {

            const { description, amount } = req.body;
            const userId = parseInt(req.userId as string);
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

    public getTransactions = async (
        req: Request,
        res: Response
    ): Promise<any> => {
        try {
            const userId = parseInt(req.userId as string);
            const { page, limit } = req.query;

            const transactionResponse = await this.transactionService.getTransactions(
                userId,
                page as string | undefined,
                limit as string | undefined,
            );
            return res.status(200).json(transactionResponse);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    };
}