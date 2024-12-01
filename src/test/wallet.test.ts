import { ControllerWallet } from '../controller/wallet'
import STATUSES from '../utils/statuses'

describe('Wallet', () => {
    let wallet: ControllerWallet;

    beforeEach(() => {
        wallet = new ControllerWallet();
    });

    test('Initial balance should be zero', () => {
        expect(wallet.getBalance()).toBe(0);
    });

    test('Crediting increases the balance', () => {
        wallet.credit(100);
        expect(wallet.getBalance()).toBe(100);
    });

    test('Debiting decreases the balance', () => {
        wallet.credit(100);
        wallet.debit(50);
        expect(wallet.getBalance()).toBe(50);
    });

    test('Debiting more than the balance throws an error', () => {
        wallet.credit(50);
        expect(() => wallet.debit(100)).toThrow(STATUSES.ERROR);
    });

    test('Operations are idempotent', () => {
        wallet.credit(100, 'txn1');
        wallet.credit(100, 'txn1'); // Retry same transaction
        expect(wallet.getBalance()).toBe(100);
    });

    test('Idempotency works for debit operations', () => {
        wallet.credit(100);
        wallet.debit(50, 'txn2');
        wallet.debit(50, 'txn2'); // Retry same transaction
        expect(wallet.getBalance()).toBe(50);
    });
});
