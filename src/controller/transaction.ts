import { TransactionDB } from "../db/transaction";

export class ControllerTransaction {
    private transaction: TransactionDB;

    constructor() {
        this.transaction = new TransactionDB();
    }

    async getTransactionById(transactionID: string) {
        return this.transaction.findById(transactionID);
    }
}
