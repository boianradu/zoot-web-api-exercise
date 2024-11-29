import { Request, Response, Router } from "express";
// import { ControllerWallet } from "../controller/wallet";
import { ControllerManager } from "../controller/manager";


const router = Router();
const controllerManager = new ControllerManager();

router.get("/wallets/:id", async (req: Request, res: Response) => {
    try {
        const walletId = req.params.id;
        const wallet = await controllerManager.getWallet(walletId);

        if (!wallet) {
            res.status(404).send({ error: "Wallet not found" });
        } else {
            res.status(200).json(wallet); // Return 200 OK with wallet balance
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

// POST /wallets/:id/credit - Credit wallet and return new balance
router.post("/wallets/:id/credit", async (req: Request, res: Response) => {
    try {
        const walletId = req.params.id;
        const { transactionId, coins } = req.body || {};

        if (!transactionId || !coins) {
            res.status(400).send({ error: "Invalid request payload" }); // Return 400 if missing data
            return
        }

        // Attempt to credit the wallet
        const [updatedWallet, status] = await controllerManager.creditWallet(walletId, transactionId, coins);

        if (status === 'duplicate') {
            res.status(202).send({ message: "Duplicate credit" });
            return
        }
        if (status === 'created') {
            res.status(201).send({ message: "Created credit" });
            return
        }

        if (status === 'credited') {
            res.status(202).send({ message: "Credited" });
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

// POST / wallets /: id / debit - Debit wallet and return new balance
router.post("/wallets/:id/debit", async (req: Request, res: Response) => {
    try {
        const walletId = req.params.id;
        const { transactionId, coins } = req.body || {};

        if (!transactionId || !coins) {
            res.status(400).send({ error: "Invalid request payload" }); // Return 400 if missing data
            return
        }

        // Attempt to debit the wallet
        const [updatedWallet, status] = await controllerManager.debitWallet(walletId, transactionId, coins);

        if (status === 'duplicate') {
            res.status(202).send({ message: "Duplicate debit" });
            return
        }
        if (status === 'created') {
            res.status(201).send({ message: "Created debit" });
            return
        }

        if (status === 'debited') {
            res.status(202).send({ message: "Debited" });
            return
        }

        if (status === 'error') {
            res.status(400).send({ message: "Error debit" });
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

export default router;
