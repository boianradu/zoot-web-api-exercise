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
        const wallet = await this.walletController.getWallet(walletId);
        if (!wallet) {
            return [null, null]
        }
        if (transactionId) {
            const transaction = await this.transactionController.getTransactionById(transactionId);
            if (transaction) return [null, 'duplicate'];

        }
        await this.walletController.creditWallet(wallet, coins);
        return [wallet, null];
    }
}
