import { Wallet } from "../models/wallet.model";
import { PrismaClient } from "@prisma/client";

type Result<T> = { success: true; data: T } | { success: false; error: string };
const prisma = new PrismaClient();

export class WalletDB {

    constructor() { }

    async create(walletId: string): Promise<Result<Wallet>> {
        try {
            const wallet = await prisma.wallet.create({
                data: {
                    id: walletId,
                    status: "active",
                    currency: "eur",
                    current_balance: 0,
                    version: 0,
                    date_creation: new Date(),
                    date_update: new Date(),
                }
            });
            if (wallet === null) {
                return { success: false, error: `Couldn't find wallet with id: ${walletId}` };
            }
            return { success: true, data: wallet };
        } catch (error) {
            if (error instanceof Error) {
                console.error("Wallet creation failed:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return { success: false, error: `Couldn't find wallet with id: ${walletId}` };
        };
    }
    async findById(walletId: string): Promise<Result<Wallet>> {
        const wallet = await prisma.wallet.findFirst({
            where: { id: walletId },
            orderBy: { date_creation: 'desc' }
        });
        if (wallet === null) {
            return { success: false, error: `Couldn't find wallet with id: ${walletId}` };
        }
        return { success: true, data: wallet };
    }

    async update(wallet: Wallet): Promise<boolean> {
        try {
            const updateWallet = await prisma.wallet.update({
                where: { id: wallet.id },
                data: {
                    status: wallet.status,
                    currency: wallet.currency,
                    current_balance: wallet.current_balance,
                    version: wallet.version,
                    date_update: new Date(),
                }
            });
            console.log("Wallet updated:", updateWallet);
            return true
        } catch (error) {
            if (error instanceof Error) {
                console.error("Wallet update failed:", error.message);
            } else {
                console.error("An unknown error occurred");
            }
            return false
        }
    }
}
