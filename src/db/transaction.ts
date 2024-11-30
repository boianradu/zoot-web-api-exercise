import { PrismaClient } from "@prisma/client";
import { Transaction } from "../models/transaction.model";  // Assuming this model is used only for TypeScript class validation
import { randomUUID } from "crypto"
// Initialize Prisma Client
const prisma = new PrismaClient();

export class TransactionDB {

    async findByUUID(transactionId: string): Promise<Transaction | null> {
        return await prisma.transaction.findUnique({
            where: { id: transactionId }
        });
    }

    async findById(transactionId: string): Promise<Transaction | null> {
        return await prisma.transaction.findFirst({
            where: { t_id: transactionId }
        });
    }

    async findByWalletId(walletId: string): Promise<Transaction | null> {
        return await prisma.transaction.findFirst({
            where: { walletId: walletId }
        });
    }

    async findAllByWalletId(walletId: string): Promise<Transaction[]> {
        return await prisma.transaction.findMany({
            where: { walletId: walletId },
            orderBy: { date: 'desc' }  // Sort by date in descending order
        });
    }

    async findLatestByWalletId(walletId: string): Promise<Transaction | null> {
        const latestTransaction = await prisma.transaction.findFirst({
            where: { walletId: walletId },
            orderBy: { date: 'desc' }
        });
        return latestTransaction;
    }

    async create(walletId: string, coins: number, transactionID: string | null): Promise<Transaction | null> {
        // First, fetch the current wallet balance (adjust according to your schema)
        const wallet = await prisma.wallet.findUnique({
            where: { id: walletId },
            select: { current_balance: true },
        });

        if (!wallet) {
            throw new Error('Wallet not found');
        }

        // Calculate the resulted balance
        const resultedBalance = wallet.current_balance + coins;  // Assuming adding coins to current balance

        // Create the transaction with the resulted_balance
        const transaction = await prisma.transaction.create({
            data: {
                status: 'completed',
                t_id: randomUUID(),
                date: new Date(),
                transaction_amount: coins,
                resulted_balance: resultedBalance,  // Add the calculated resulted_balance
                wallet: { connect: { id: walletId } },
            },
        });

        return transaction;
    }
}
