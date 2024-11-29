import { AppDataSource } from "./db";
import { TransactionHistory } from "../models/transaction.model";

export class TransactionDB {
    private repository = AppDataSource.getRepository(TransactionHistory);

    async findByUUID(transactionId: string): Promise<TransactionHistory | null> {
        return await this.repository.findOneBy({ id: transactionId });
    }
    async findById(transactionId: string): Promise<TransactionHistory | null> {
        return await this.repository.findOneBy({ t_id: transactionId });
    }
    async findByWalletId(walletId: string): Promise<TransactionHistory | null> {
        return await this.repository.findOneBy({ id_wallet: walletId });
    }

    async create(walletId: string, coins: number, transactionID: string | null): Promise<TransactionHistory | null> {
        const tr = new TransactionHistory(null, transactionID, walletId, coins);
        const transaction = await this.repository.save(tr);

        if (!transaction) {
            return null
        }
        return transaction
    }
}
