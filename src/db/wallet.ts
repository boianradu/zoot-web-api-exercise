import { AppDataSource } from "./db";
import { Wallet } from "../models/wallet.model";

export class WalletDB {
    private wallet = AppDataSource.getRepository(Wallet);

    constructor() {

    }
    async cr(walletId: string): Promise<Wallet | null> {
        return await this.wallet.create({ id: walletId });
    }

    async createWallet(walletId: string, coins: number): Promise<Wallet | null> {
        const tr = new Wallet(walletId, "active", coins);
        const wallet = await this.wallet.save(tr);
        if (!wallet) {
            return null
        }
        return wallet
    }

    async findById(walletId: string): Promise<Wallet | null> {
        return await this.wallet.findOneBy({ id: walletId });
    }

    async update(wallet: Wallet): Promise<void> {
        await this.wallet.save(wallet);
    }
}
