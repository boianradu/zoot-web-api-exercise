import { TransactionDB } from "../db/transaction";

export class ControllerTransaction {
    private transaction: TransactionDB;

    constructor() {
        this.transaction = new TransactionDB();
    }

    async getTransactionById(transactionID: string) {
        return this.transaction.findById(transactionID);
    }

    async getLatestTransaction(walletId: string) {
        const transaction = await this.transaction.findLatestByWalletId(walletId);
        if (!transaction) {
            return null
        }
        return transaction;
    }

    async createTransaction(walletId: string, coins: number, transactionID: string | null, status: string) {
        const transaction = await this.transaction.create(walletId, coins, transactionID, status)
        if (!transaction) {
            return null
        }
        return transaction;
    }

}
