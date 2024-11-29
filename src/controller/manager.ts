import { ControllerWallet } from "./wallet";
import { ControllerTransaction } from "./transaction";

export class ControllerManager {
    private walletController: ControllerWallet;
    private transactionController: ControllerTransaction;

    constructor() {
        this.walletController = new ControllerWallet();
        this.transactionController = new ControllerTransaction();
    }
    async getWallet(walletId: string) {
        return await this.walletController.getWallet(walletId);
    }
    async getWalletBalance(walletId: string) {
        await this.walletController.getWallet(walletId);
    }

    async creditWallet(walletId: string, transactionId: string | null, coins: number) {
        let wallet = await this.walletController.getWallet(walletId);
        let finalStatus = "credited"
        if (!wallet) {
            wallet = await this.walletController.createWallet(walletId, coins)
            finalStatus = "created"
        }
        if (transactionId) {
            let transaction = await this.transactionController.getTransactionById(transactionId);
            if (transaction) {
                // return [null, 'duplicate'];
                console.log("created transaction ", transactionId, " for wallet ", walletId)
            } else {
                transaction = await this.transactionController.createTransaction(walletId, coins, transactionId);
            }
        }
        if (!wallet) {
            return [null, "cannot create"]
        }
        await this.walletController.creditWallet(wallet, coins);
        return [wallet, finalStatus];
    }


    async debitWallet(walletId: string, transactionId: string | null, coins: number) {
        const wallet = await this.walletController.getWallet(walletId);
        if (!wallet) {
            return [null, "error"]
        }
        if (transactionId) {
            let transaction = await this.transactionController.getTransactionById(transactionId);
            if (transaction) {
                // return [null, 'duplicate'];
                console.log("created transaction ", transactionId, " for wallet ", walletId)
            } else {
                transaction = await this.transactionController.createTransaction(walletId, coins, transactionId);
            }
        }
        if (!wallet) {
            return [null, "cannot create"]
        }
        if (wallet.current_balance - coins < 0) {
            return [wallet, "error"]
        }
        await this.walletController.debitWallet(wallet, coins);
        return [wallet, "debited"];
    }
}
