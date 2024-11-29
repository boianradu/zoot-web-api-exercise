import { AppDataSource } from "./db";
import { TransactionHistory } from "../models/transaction.model";

export class TransactionDB {
    private repository = AppDataSource.getRepository(TransactionHistory);

    async findById(transactionId: string): Promise<TransactionHistory | null> {
        return await this.repository.findOneBy({ id: transactionId });
    }
    async findByWalletId(walletId: string): Promise<TransactionHistory | null> {
        return await this.repository.findOneBy({ id_wallet: walletId });
    }

    async create(coins: number, walletId: string): Promise<void> {
        const tr = new TransactionHistory(null, walletId, coins);
        await this.repository.save(tr);
    }
}
