import { PrismaClient } from "@prisma/client";
import { Transaction } from "../models/transaction.model";  // Assuming this model is used  
// Initialize Prisma Client
const prisma = new PrismaClient();

export class TransactionDB {

    async findById(transactionId: string): Promise<Transaction | null> {
        try {
            const transactionFound = await prisma.transaction.findFirst({
                where: { t_id: transactionId }
            });
            console.log("Transaction found:", transactionFound);
            return transactionFound
        } catch (error) {
            if (error instanceof Error) {
                console.error("Transaction not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }

            throw new Error("Transaction not found: " + error);
        }
    }

    async findByWalletId(walletId: string): Promise<Transaction | null> {
        try {
            const transactionFound = await prisma.transaction.findFirst({
                where: { walletId: walletId }
            });
            console.log("Transaction found:", transactionFound);
            return transactionFound
        } catch (error) {
            if (error instanceof Error) {
                console.error("Transaction not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }

            throw new Error("Transaction not found: " + error);
        }
    }

    async findAllByWalletId(walletId: string): Promise<Transaction[]> {
        try {
            const transactionFound = await prisma.transaction.findMany({
                where: { walletId: walletId },
                orderBy: { date: 'desc' }
            });
            console.log("Transaction found:", transactionFound);
            return transactionFound
        } catch (error) {
            if (error instanceof Error) {
                console.error("Transaction not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            throw new Error("Transaction not found: " + error);
        }
    }

    async findLatestByWalletId(walletId: string): Promise<Transaction | null> {
        try {
            const transactionFound = await prisma.transaction.findFirst({
                where: { walletId: walletId },
                orderBy: { date: 'desc' }
            });
            console.log("Transaction found:", transactionFound);
            return transactionFound
        } catch (error) {
            if (error instanceof Error) {
                console.error("Transaction not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            throw new Error("Transaction not found: " + error);
        }
    }

    async create(walletId: string, coins: number, transactionID: string | null, status: string): Promise<Transaction | null> {
        try {
            const wallet = await prisma.wallet.findFirst({
                where: { id: walletId },
                select: { current_balance: true },
            });

            if (!wallet) {
                console.error('Wallet not found');
                return null;
            }
            const resultedBalance = wallet.current_balance + coins;

            // Create the transaction with the resulted_balance
            const transaction = await prisma.transaction.create({
                data: {
                    status: status,
                    t_id: transactionID || "",
                    date: new Date(),
                    transaction_amount: coins,
                    resulted_balance: resultedBalance,
                    wallet: { connect: { id: walletId } },
                },
            });
            console.log("Transaction created:", transactionID);
            return transaction;
        } catch (error) {
            if (error instanceof Error) {
                console.error("Transaction not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            throw new Error("Transaction not found: " + error);
        }
    }
}
