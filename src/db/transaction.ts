import { PrismaClient } from "@prisma/client";
import { Transaction } from "../models/transaction.model";  // 
type Result<T> = { success: true; data: T } | { success: false; error: string };
const prisma = new PrismaClient();

export class TransactionDB {

    async findById(transactionId: string): Promise<Result<Transaction>> {
        try {
            const transaction = await prisma.transaction.findFirst({
                where: { t_id: transactionId }
            });
            if (transaction === null) {
                console.log("Transaction not found:", transactionId);
                return { success: false, error: `Couldn't find wallet with id: ${transactionId}` };
            }
            console.log("Transaction found:", transaction);
            return { success: true, data: transaction };
        } catch (error) {
            if (error instanceof Error) {
                console.error("Transaction not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }

            return { success: false, error: `Couldn't find transaction by wallet id: ${transactionId}` };
        }
    }

    async findLatestByWalletId(walletId: string): Promise<Result<Transaction>> {
        try {
            const transaction = await prisma.transaction.findFirst({
                where: { walletId: walletId },
                orderBy: { date: 'desc' }
            });
            if (transaction === null) {
                console.log("Transaction not found:", transaction);
                return { success: false, error: `Couldn't  transaction by wallet id: ${walletId}` };
            }
            console.log("Transaction found:", transaction);
            return { success: true, data: transaction };
        } catch (error) {
            if (error instanceof Error) {
                console.error("Transaction not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return { success: false, error: `Couldn't  transaction by wallet id: ${walletId}` };
        }
    }

    async create(walletId: string, coins: number, transactionID: string | null, status: string): Promise<Result<Transaction>> {
        try {
            const wallet = await prisma.wallet.findFirst({
                where: { id: walletId },
                select: { current_balance: true },
            });

            if (!wallet) {
                return { success: false, error: `Couldn't create transaction by wallet id: ${walletId}` };
            }
            if (transactionID != null) {
                const transaction = await prisma.transaction.findFirst({
                    where: { t_id: transactionID },
                })
                if (transaction) {
                    return { success: false, error: `Transaction already exists: ${transactionID}` };
                }
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
            if (transaction === null) {
                return { success: false, error: `Couldn't  transaction by wallet id: ${walletId}` };
            }
            return { success: true, data: transaction };
        } catch (error) {
            if (error instanceof Error) {
                console.error("Transaction not found:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return { success: false, error: `Couldn't  transaction by wallet id: ${walletId}` };
        }
    }
}
