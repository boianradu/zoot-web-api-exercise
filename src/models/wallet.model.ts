import { Transaction } from "./transaction.model"; // Import the TransactionHistory entity
import { randomUUID } from "crypto"
export class Wallet {
    id: string;
    status: string;
    currency: string;
    current_balance: number;
    date_creation: Date;
    version: number;
    date_update: Date;
    transactions?: Transaction[];

    constructor(
        id: string | null = null,
        status: string = '',
        currency: string = '',
        current_balance: number = 0,
        version: number = 0
    ) {
        this.id = id ?? randomUUID().toString();
        this.status = status;
        this.currency = currency;
        this.current_balance = current_balance;
        this.date_creation = new Date();
        this.date_update = new Date();
        this.version = version;
    }
}
