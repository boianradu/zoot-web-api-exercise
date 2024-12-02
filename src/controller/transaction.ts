import { TransactionDB } from "../db/transaction";
import { Transaction } from "../models/transaction.model";

export class ControllerTransaction {
    private transaction: TransactionDB;

    constructor() {
        this.transaction = new TransactionDB();
    }

    async getTransactionById(transactionID: string): Promise<Transaction | null> {
        try {
            const transactionResult = await this.transaction.findById(transactionID);
            if (transactionResult.success) {
                return transactionResult.data
            }
            return null
        } catch (error) {
            if (error instanceof Error) {
                console.error("Wallet not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return null
        }
    }

    async getLatestTransaction(walletId: string): Promise<Transaction | null> {
        try {
            const transactionResult = await this.transaction.findLatestByWalletId(walletId);
            if (transactionResult.success) {
                return transactionResult.data
            }
            return null
        } catch (error) {
            if (error instanceof Error) {
                console.error("Wallet not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return null
        }
    }

    async createTransaction(walletId: string, coins: number, transactionID: string | null, status: string): Promise<Transaction | null> {
        try {
            const transactionResult = await this.transaction.create(walletId, coins, transactionID, status)
            if (transactionResult.success) {
                return transactionResult.data
            }
            return null
        } catch (error) {
            if (error instanceof Error) {
                console.error("Error creating transaction:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return null
        }
    }

}
