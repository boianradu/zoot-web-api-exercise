import { ControllerWallet } from '../controller/wallet'
import { randomUUID } from "crypto"
import { Wallet } from '../models/wallet.model';

describe('Wallet - empty', () => {
    let walletController: ControllerWallet;
    walletController = new ControllerWallet();
    let walletUUID = randomUUID();
    // let wallet = walletController.create(walletUUID);

    beforeEach(() => {
        // Reset mock before each test 
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
        const res = walletController.create(walletUUID)
        expect(res).toBeDefined
    });

    //     const walletId = walletUUID;

    //     // Prepare mock return value
    //     const mockWallet = {
    //         id: walletId,
    //         status: 'active',
    //         currency: 'USD',
    //         current_balance: 0,
    //         version: 0,
    //         date_update: new Date(),
    //     };

    //     // Call the method
    //     const result = await walletController.create(walletId);
    //     expect(result).toBe(mockWallet);

    // });

    // test('Initial balance should be zero', () => {
    //     expect(walletController.getWallet(walletUUID)).toBe(0);
    // });

    // test('Crediting increases the balance', () => {
    //     wallet.cre(wallet.createWallet, 100);
    //     expect(wallet.getBalance()).toBe(100);
    // });

    // test('Debiting decreases the balance', () => {
    //     wallet.credit(100);
    //     wallet.debit(50);
    //     expect(wallet.getBalance()).toBe(50);
    // });

    // test('Debiting more than the balance throws an error', () => {
    //     wallet.credit(50);
    //     expect(() => wallet.debit(100)).toThrow(STATUSES.ERROR);
    // });

    // test('Operations are idempotent', () => {
    //     wallet.credit(100, 'txn1');
    //     wallet.credit(100, 'txn1'); // Retry same transaction
    //     expect(wallet.getBalance()).toBe(100);
    // });

    // test('Idempotency works for debit operations', () => {
    //     wallet.credit(100);
    //     wallet.debit(50, 'txn2');
    //     wallet.debit(50, 'txn2'); // Retry same transaction
    //     expect(wallet.getBalance()).toBe(50);
    // });
});
