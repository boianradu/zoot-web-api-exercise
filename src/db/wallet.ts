import { Wallet } from "../models/wallet.model";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class WalletDB {

    constructor() { }

    async createWallet(walletId: string, coins: number): Promise<Wallet | null> {
        const wallet = await prisma.wallet.create({
            data: {
                id: walletId,
                status: "active",
                currency: "eur",
                current_balance: coins,
                version: 1,
                date_creation: new Date(),
                date_update: new Date(),
            }
        });

        return wallet;
    }

    async findById(walletId: string): Promise<Wallet | null> {
        return await prisma.wallet.findFirst({
            where: { id: walletId }
        });
    }

    async update(wallet: Wallet): Promise<void> {
        await prisma.wallet.update({
            where: { id: wallet.id },
            data: {
                status: wallet.status,
                currency: wallet.currency,
                current_balance: wallet.current_balance,
                version: wallet.version,
                date_update: new Date(),
            }
        });
    }
}
