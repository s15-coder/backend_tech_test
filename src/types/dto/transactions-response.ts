import AppTransaction from "../model/app_transaction.entity";

export interface TransactionsResponse {
    transactions: AppTransaction[];
    totalPages: number;
    currentPage: number;
}
   