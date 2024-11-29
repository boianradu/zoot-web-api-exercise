import { AppDataSource } from "./db";
import { Wallet } from "../models/wallet.model";

export class WalletDB {
    private wallet = AppDataSource.getRepository(Wallet);

    constructor() {

    }
    async findById(walletId: string): Promise<Wallet | null> {
        return await this.wallet.findOneBy({ id: walletId });
    }

    async update(wallet: Wallet): Promise<void> {
        await this.wallet.save(wallet);
    }
}
