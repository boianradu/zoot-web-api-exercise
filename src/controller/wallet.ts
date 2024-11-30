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
    async createWallet(walletId: string, coins: number) {
        const wallet = await this.currentWallet.createWallet(walletId, coins)
        if (!wallet) {
            return null
        }
        return wallet;
    }

    async creditWallet(wallet: Wallet, coins: number) {
        if (!wallet) return null;

        wallet.current_balance += coins;
        wallet.version += 1

        await this.currentWallet.update(wallet);
        return wallet;
    }

    async debitWallet(wallet: Wallet, coins: number) {

        if (!wallet) return null;

        wallet.current_balance -= coins;
        wallet.version += 1

        await this.currentWallet.update(wallet);

        return wallet;
    }
}
