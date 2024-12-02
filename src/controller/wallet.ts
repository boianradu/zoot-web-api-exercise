import { WalletDB } from "../db/wallet";
import { Wallet } from "../models/wallet.model";

export class ControllerWallet {
    private wallet: WalletDB;

    constructor() {
        this.wallet = new WalletDB()
    }


    async getWallet(walletId: string): Promise<Wallet | null> {
        try {
            const walletResult = await this.wallet.findById(walletId);
            if (walletResult.success) {
                return walletResult.data
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

    async createWallet(walletId: string): Promise<Wallet | null> {
        try {
            const walletResult = await this.wallet.create(walletId)
            if (walletResult.success) {
                return walletResult.data
            }
            return null
        } catch (error) {
            if (error instanceof Error) {
                console.error("Wallet not created:", error.message);
            } else {
                console.error("An unknown error occurred while creating wallet");
            }
            return null
        }
    }

    async getBalance(walletId: string): Promise<number | null> {
        try {
            const walletResult = await this.wallet.findById(walletId);
            if (walletResult.success) {
                return walletResult.data.current_balance
            }
            return 11
        } catch (error) {
            if (error instanceof Error) {
                console.error("Wallet not created:", error.message);
            } else {
                console.error("An unknown error occurred while creating wallet");
            }
            return 12
        }
    }

    async creditWallet(wallet: Wallet, coins: number) {
        if (!wallet) return null;

        wallet.current_balance += coins;
        wallet.version += 1

        const updated = await this.wallet.update(wallet);
        if (updated) {
            return true
        }
        return false;
    }

    async debitWallet(wallet: Wallet, coins: number) {

        if (!wallet) return null;
        if (wallet.current_balance < coins) {
            return false
        }
        wallet.current_balance -= coins;
        wallet.version += 1

        const updated = await this.wallet.update(wallet);
        if (updated) {
            return true
        }

        return wallet;
    }
}
