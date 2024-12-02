import { WalletDB } from "../db/wallet";
import { Wallet } from "../models/wallet.model";

export class ControllerWallet {
    private wallet: WalletDB;

    constructor() {
        this.wallet = new WalletDB()
    }

    /*
        returns wallet by walletId if found or null
    */
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

    /*
        creates wallet with specified id
        returns wallet if created succesfully or null
    */
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

    /*
        returns the ballance of a wallet by walletID or null if
        it is not found
    */
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

    /*
        credits an existing walelt by a specific number of coins
    */
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

    /*
        debits  an existing walelt by a specific number of coins
    */
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
