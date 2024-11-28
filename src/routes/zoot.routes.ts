import express, { Request, Response } from "express";
import { WalletService } from "../core/wallet";
import { WalletRepository } from "../db/wallet";

const router = express.Router();
const walletRepository = new WalletRepository();
const walletService = new WalletService(walletRepository);

// GET /wallets/:id - Retrieve wallet balance
router.get("/wallets/:id", async (req: Request, res: Response) => {
    try {
        const walletId = req.params.id;
        const wallet = await walletService.getWalletBalance(walletId);

        if (!wallet) {
            res.status(404).send({ error: "Wallet not found" });
        }

        res.json(wallet);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// POST /wallets/:id/credit - Credit wallet and return new balance
router.post("/wallets/:id/credit", (req: Request, res: Response) => {
    try {
        const walletId = req.params.id;
        const { transactionId, coins } = req.body;

        if (!transactionId || !coins) {
            res.status(400).send({ error: "Invalid request payload" });
        }

        const updatedWallet = walletService.creditWallet(walletId, transactionId, coins);

        if (!updatedWallet) {
            res.status(404).send({ error: "Wallet not found" });
        }

        res.json(updatedWallet);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
    res.status(500).send({ error: "Internal Server Error" });
});
export default router;
