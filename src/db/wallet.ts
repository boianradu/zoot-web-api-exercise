import { AppDataSource } from "./db";
import { Wallet } from "../models/wallet.model";

export class WalletRepository {
    private repository = AppDataSource.getRepository(Wallet);

    async findById(walletId: string): Promise<Wallet | null> {
        return await this.repository.findOneBy({ id: parseInt(walletId) });
    }

    async update(walletId: string, wallet: Wallet): Promise<void> {
        await this.repository.save(wallet);
    }
}
