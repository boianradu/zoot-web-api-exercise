import { TransactionDB } from "../db/transaction";
import { Transaction } from "../models/transaction.model";

export class ControllerTransaction {
    private transaction: TransactionDB;

    constructor() {
        this.transaction = new TransactionDB();
    }

    /*
        returns a transaction by transactionID if exists or null
    */
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

    /*
        returns the latests transaction by walletId if exists or null
    */
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

    /*
        creates transaction by walletID, coins and transacstion id if defined + status
        returns the transasction if it is successful or null if not
    */
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
