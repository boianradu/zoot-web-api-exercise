import { ControllerWallet } from "./wallet";
import { ControllerTransaction } from "./transaction";
export class WalletManager {
    private walletController: ControllerWallet;
    private transactionController: ControllerTransaction;

    constructor() {
        this.walletController = new ControllerWallet();
        this.transactionController = new ControllerTransaction();
    }


    async creditWallet(walletId: string, transactionId: string | null, coins: number): Promise<[boolean, string]> {
        let wallet = await this.walletController.getWallet(walletId);
        let finalStatus = "credited"
        if (!wallet) {
            wallet = await this.walletController.createWallet(walletId)
            if (wallet) {
                finalStatus = "created"
            } else {
                return [false, "cannot create"]
            }
        }
        if (transactionId) {
            let transaction = await this.transactionController.getTransactionById(transactionId);
            if (transaction) {
                console.log("duplicate transaction ", transactionId, " for wallet ", walletId)
                return [false, "duplicate"]
            } else {
                console.log("created transaction ", transactionId, " for wallet ", walletId)
                transaction = await this.transactionController.createTransaction(walletId, coins, transactionId, "successful");

                if (transaction != null) {
                    finalStatus = "created"
                } else {
                    return [false, "cannot create transaction"]
                }
            }
        }
        const result = await this.walletController.creditWallet(wallet, coins);
        if (result) {
            return [true, finalStatus];
        } else {
            return [false, "couldn't credit" + walletId]
        }
    }


    async debitWallet(walletId: string, transactionId: string | null, coins: number): Promise<[boolean, string]> {
        const wallet = await this.walletController.getWallet(walletId);
        if (!wallet) {
            console.log("wallet not found with id:", walletId)
            return [false, "error"]
        }
        let status = "debited"
        if (wallet.current_balance - coins < 0) {
            return [false, "error"]
        }
        if (transactionId) {
            let transaction = await this.transactionController.getTransactionById(transactionId);
            if (transaction) {
                console.log("duplicate transaction ", transactionId, " for wallet ", walletId)
                status = "duplicate"
                return [false, "duplicate"]
            } else {
                transaction = await this.transactionController.createTransaction(walletId, coins, transactionId, "successful");
            }
        }
        if (!wallet) {
            return [false, "cannot create"]
        }
        await this.walletController.debitWallet(wallet, coins);
        return [true, status];
    }

    async getLatestDetails(walletId: string): Promise<[string, number, number]> {
        const wallet = await this.walletController.getWallet(walletId);
        if (!wallet) {
            console.log("wallet not found with id", walletId)
            return Promise.reject(new Error('Wallet not found'));
        }
        const latestTransaction = await this.transactionController.getLatestTransaction(walletId);
        if (!latestTransaction) {
            console.log("no transactions yet on wallet", walletId)
            return ["", wallet.version, wallet.current_balance]
        }
        return [latestTransaction.t_id, wallet.version, wallet.current_balance]

    }

}
