import { ControllerTransaction } from '../controller/transaction'
import { ControllerWallet } from '../controller/wallet'

import { randomUUID } from "crypto"

describe('Transaction - empty', () => {
    const transactionController = new ControllerTransaction();
    const walletController = new ControllerWallet();
    const walletUUID = randomUUID();
    const sampleTransactionID = randomUUID();

    beforeEach(async () => {
        const w = await walletController.createWallet(walletUUID)
        expect(w).toBeDefined()
    });

    test('Get non-existing transaction', async () => {
        const walletUUID = 'non-existing-uuid';
        const result = await transactionController.getTransactionById(walletUUID);
        expect(result).toEqual(null);
    });


    test('Create transaction', async () => {
        const wallet = await walletController.getWallet(walletUUID);
        expect(wallet?.id).toEqual(walletUUID)
        const transaction = await transactionController.createTransaction(walletUUID, 100, sampleTransactionID, "successful")
        console.log("Transaction:", transaction)
        expect(transaction).toBeDefined()
    });


    test('Find transaction', async () => {
        const transaction = await transactionController.getTransactionById(sampleTransactionID)
        expect(transaction?.t_id).toEqual(sampleTransactionID)
    });


    test('Idenmpotent transactions', async () => {

        const wallet = await walletController.getWallet(walletUUID);
        expect(wallet?.id).toEqual(walletUUID)
        const transaction1 = await transactionController.createTransaction(walletUUID, 100, sampleTransactionID, "successful")
        const transaction2 = await transactionController.createTransaction(walletUUID, 55, sampleTransactionID, "successful")
        console.log("Transaction:", transaction1)
        console.log("Transaction:", transaction2)
        expect(transaction1).toBeDefined()
        expect(transaction2).toBeNull()

    });
});
