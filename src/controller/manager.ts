import { ControllerWallet } from "./wallet";
import STATUSES from '../utils/statuses';
import { ControllerTransaction } from "./transaction";
export class WalletManager {
    private walletController: ControllerWallet;
    private transactionController: ControllerTransaction;

    constructor() {
        this.walletController = new ControllerWallet();
        this.transactionController = new ControllerTransaction();
    }

    /*
        credits wallet if the wallet is found by id
        if a transaction is defined and found, it is considered duplicate

        walletId - the id of the wallet
        transaction - the transaction to be credited to the wallet
        coins - the coins to be credited to the wallet

        returns:
            boolean - status true or false
            string - message
    */
    async creditWallet(walletId: string, transactionId: string | null, coins: number): Promise<[boolean, string]> {
        let wallet = await this.walletController.getWallet(walletId);
        let finalStatus = STATUSES.CREDITED
        if (!wallet) {
            wallet = await this.walletController.createWallet(walletId)
            if (wallet) {
                finalStatus = STATUSES.CREATED
            } else {
                return [false, STATUSES.CANNOT_CREATE]
            }
        }
        let transaction = await this.transactionController.getTransactionById(transactionId);
        if (transaction) {
            return [false, STATUSES.DUPLICATE]
        } else {
            transaction = await this.transactionController.createTransaction(walletId, coins, transactionId, "successful");

            if (transaction != null) {
                finalStatus = STATUSES.CREATED
            } else {
                return [false, STATUSES.CANNOT_CREATE]
            }
            const result = await this.walletController.creditWallet(wallet, coins);
            if (result) {
                return [true, finalStatus];
            } else {
                // 4 update transactrion status
                return [false, STATUSES.CANNOT_CREATE]
            }
        }

    /*
        debits wallet if the wallet is found by id and the coins to be extracted
        are less than the balance existed
        if a transaction is defined and found, it is considered duplicate

        walletId - the id of the wallet
        transaction - the transaction to be credited to the wallet
        coins - the coins to be credited to the wallet

        returns:
            boolean - status true or false
            string - message
    */
    async debitWallet(walletId: string, transactionId: string | null, coins: number): Promise < [boolean, string] > {
            const wallet = await this.walletController.getWallet(walletId);
            if(!wallet) {
                return [false, STATUSES.ERROR]
            }
        let status = STATUSES.DEBITED
        if(wallet.current_balance - coins < 0) {
            return [false, STATUSES.ERROR]
        }
        if (transactionId) {
            let transaction = await this.transactionController.getTransactionById(transactionId);
            if (transaction) {
                status = STATUSES.DUPLICATE
                return [false, STATUSES.DUPLICATE]
            } else {
                transaction = await this.transactionController.createTransaction(walletId, coins, transactionId, "successful");
            }
        }
        if (!wallet) {
            return [false, STATUSES.ERROR]
        }
        await this.walletController.debitWallet(wallet, coins);
        return [true, status];
    }

    async getLatestDetails(walletId: string): Promise<[string, number, number]> {
        const wallet = await this.walletController.getWallet(walletId);
        if (!wallet) {
            return Promise.reject(new Error('Wallet not found'));
        }
        const latestTransaction = await this.transactionController.getLatestTransaction(walletId);
        if (!latestTransaction) {
            return ["", wallet.version, wallet.current_balance]
        }
        return [latestTransaction.t_id, wallet.version, wallet.current_balance]

    }

}
