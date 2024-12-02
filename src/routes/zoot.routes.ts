import { Request, Response, Router } from "express";
import { WalletManager } from "../controller/manager";
import STATUSES from "../utils/statuses"


const router = Router();
const walletManager = new WalletManager();

// GET /wallets returns wallet (latest transaciton, version and currentBalance) by WalletID if exists
router.get("/wallets/:id", async (req: Request, res: Response) => {
    try {
        const walletId = req.params.id;
        const [transactionId, version, currentBalance] = await walletManager.getLatestDetails(walletId);
        const answer = { transactionId: transactionId, version: version, coins: currentBalance }
        res.status(200).json(answer);
    } catch (error) {
        console.error(error);
        res.status(404).send({ error: "No wallet found" });
    }
});

//  Credit wallet and return new balance
router.post("/wallets/:id/credit", async (req: Request, res: Response) => {
    try {
        const walletId = req.params.id;
        const { transactionId, coins } = req.body || {};

        if (!transactionId || !coins) {
            res.status(400).send({ error: "Invalid request payload" }); // Return 400 if missing data
            return
        }

        // Attempt to credit the wallet
        const [updatedWallet, status] = await walletManager.creditWallet(walletId, transactionId, coins);
        console.log("Status for crediting:", walletId, status)
        if (status === STATUSES.CREATED) {
            res.status(201).send({ message: STATUSES.CREATED });
            return
        }

        if (status === STATUSES.DUPLICATE) {
            res.status(202).send({ message: STATUSES.DUPLICATE });
            return
        }

        if (status === STATUSES.CREDITED) {
            res.status(202).send({ message: STATUSES.CREDITED });
            return
        }
        if (!updatedWallet) {
            res.status(404).send({ error: "Wallet not found" }); // 404 if wallet not found
            return
        }

        // Return 201 when credit is successfully processed
        res.status(201).json(updatedWallet);
        return
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
        return
    }
});

//   Debit wallet and return new balance
router.post("/wallets/:id/debit", async (req: Request, res: Response) => {
    try {
        const walletId = req.params.id;
        const { transactionId, coins } = req.body || {};

        if (!transactionId || !coins) {
            res.status(400).send({ error: "Invalid request payload" }); // Return 400 if missing data
            return
        }

        // Attempt to debit the wallet
        const [updatedWallet, status] = await walletManager.debitWallet(walletId, transactionId, coins);

        if (status === 'error') {
            res.status(400).send({ message: "Error debit" });
            return
        } else if (status == "duplicate") {
            res.status(202).send({ message: "Duplicate debit" });
        } else if (status == "debited") {
            res.status(201).send({ message: "Duplicate debit" });
        } else if (!updatedWallet) {
            console.log("Wallet not found" + status)
            res.status(404).send({ error: "Wallet not found" + status }); // 404 if wallet not found
            return
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
        return
    }
});

export default router;
