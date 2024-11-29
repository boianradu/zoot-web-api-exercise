import { WalletDB } from "../db/wallet";
import { Wallet } from "../models/wallet.model";

export class ControllerWallet {
    private currentWallet: WalletDB;

    constructor() {
        this.currentWallet = new WalletDB()
    }


    async getWallet(walletId: string) {
        const wallet = this.currentWallet.findById(walletId);
        return wallet
    }


    async getWalletBalance(walletId: string) {
        const wallet = this.currentWallet.findById(walletId);
        await wallet.then(walletResolved => {
            if (walletResolved) {
                console.log(walletResolved); // Access the wallet object here
                return walletResolved.current_balance
            } else {
                console.log("Wallet not found");
                return null
            }
        }).catch(error => {
            console.error("Error fetching wallet", error);
            return null
        });
    }
    async createWallet(walletId: string) {
        let wallet = await this.currentWallet.createWallet()
        return wallet;
    }

    async creditWallet(wallet: Wallet, coins: number) {
        if (!wallet) return null;

        wallet.current_balance += coins;

        await this.currentWallet.update(wallet);
        return wallet;
    }

    async debitWallet(walletId: string, transactionId: string, coins: number) {
        const wallet = await this.currentWallet.findById(walletId);

        if (!wallet) return null;

        wallet.current_balance -= coins;

        await this.currentWallet.update(wallet);

        return wallet;
    }
}
