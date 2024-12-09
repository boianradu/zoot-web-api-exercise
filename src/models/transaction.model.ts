import { randomUUID } from "crypto"
export class Transaction {
    id: string;
    t_id: string;
    walletId: string;
    date: Date;
    transaction_amount: number;
    status: string;
    details: string;

    constructor(
        t_id: string | null = null,
        walletId: string,
        transaction_amount: number = 0,
        status: string = '',
    ) {
        this.id = t_id ?? randomUUID();
        this.t_id = t_id ?? randomUUID();
        this.walletId = walletId;
        this.details = "";
        this.date = new Date(); // Default to current date
        this.transaction_amount = transaction_amount;
        this.status = status;
    }

}