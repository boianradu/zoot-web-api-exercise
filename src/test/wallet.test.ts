import { ControllerWallet } from '../controller/wallet'
import { randomUUID } from "crypto"

describe('Wallet - empty', () => {
    const walletController = new ControllerWallet();
    const walletUUID = randomUUID();

    beforeEach(() => {
    });

    test('Get non-existing wallet', async () => {
        const walletUUID = 'non-existing-uuid';
        const result = await walletController.getWallet(walletUUID);
        expect(result).toEqual(null);
    });
    test('Wallet balance before creation should be null', async () => {
        const result = await walletController.getWallet(walletUUID);
        expect(result).toBe(null);
    });

    test('Create wallet', async () => {
        const wallet = await walletController.createWallet(walletUUID)
        expect(wallet).toBeDefined()
    });

    test('Initial balance should be zero', async () => {
        const balance = await walletController.getBalance(walletUUID)
        expect(balance).toBe(0);
    });

    test('Crediting increases the balance', async () => {
        const wallet = await walletController.getWallet(walletUUID)
        if (wallet == null) {
            return
        } else {
            expect(wallet).toBeDefined();
            const creditW = await walletController.creditWallet(wallet, 100)
            expect(creditW).toBeDefined();
            expect(await walletController.getBalance(walletUUID)).toBe(100);
        }
    });

    test('Debiting decreases the balance', async () => {
        const wallet = await walletController.getWallet(walletUUID)
        if (wallet == null) {
            return
        } else {
            const debit = await walletController.debitWallet(wallet, 50);
            expect(debit).toBeDefined();
            expect(await walletController.getBalance(walletUUID)).toBe(50);
        }
    });

    test('Debiting more than the balance throws an error', async () => {
        const wallet = await walletController.getWallet(walletUUID)
        if (wallet == null) {
            return
        } else {
            const debit = await walletController.debitWallet(wallet, 500);
            expect(debit).toEqual(false);
        }
    });

});
