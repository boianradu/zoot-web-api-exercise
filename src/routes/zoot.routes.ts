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

// POST /wallets/:id/debit - Debit wallet and return new balance
// router.post("/wallets/:id/debit", async (req: Request, res: Response) => {
//     try {
//         const walletId = req.params.id;
//         const { transactionId, amount } = req.body || {};

//         if (!transactionId || !amount) {
//             res.status(400).send({ error: "Invalid request payload" }); // 400 if missing data
//         }

//         const wallet = await controllerManager.getWallet(walletId);

//         if (!wallet) {
//             res.status(404).send({ error: "Wallet not found" }); // 404 if wallet not found
//             return
//         }

//         if (wallet.current_balance < amount) {
//             res.status(400).send({ error: "Insufficient funds" }); // 400 if insufficient funds
//             return
//         }

//         // Debit the wallet
//         const [updatedWallet, status] = await walletService.debitWallet(walletId, transactionId, amount);

//         if (!updatedWallet) {
//             res.status(404).send({ error: "Wallet not found" }); // 404 if wallet not found
//             return
//         }

//         // If this is a duplicate debit, return 202
//         if (status === 'duplicate') {
//             res.status(202).send({ message: "Duplicate debit" });
//             return
//         }

//         // Return 201 when debit is successfully processed
//         res.status(201).json(updatedWallet);
//         return
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: "Internal Server Error" });
//     }
// });

export default router;
