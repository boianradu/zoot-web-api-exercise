import { WalletRepository } from "../db/wallet";

export class WalletService {
    private repository: WalletRepository;

    constructor(repository: WalletRepository) {
        this.repository = repository;
    }

    async getWalletBalance(walletId: string) {
        return this.repository.findById(walletId);
    }

    async creditWallet(walletId: string, transactionId: string, coins: number) {
        const wallet = await this.repository.findById(walletId);

        if (!wallet) return null;

        // wallet.transactions.push(transactionId);
        wallet.current_balance += coins;

        await this.repository.update(walletId, wallet);

        return wallet;
    }
}
