import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TransactionHistory } from "./transaction.model"; // Import the TransactionHistory entity
import { randomUUID } from "crypto"

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    status: string; // "active" or "inactive"

    @Column("float")
    currency: number;

    @Column("float")
    current_balance: number;

    @Column("date")
    date_creation: Date;

    @Column("date")
    date_update: Date;

    // Define relationships if needed
    @OneToMany(() => TransactionHistory, (transaction) => transaction.id)
    transactions: TransactionHistory[] | undefined;

    constructor(id: string | null = null, status: string = '', currency: number = 0, current_balance: number = 0) {
        this.id = id ?? randomUUID()
        this.status = status;  // Default value for status
        this.currency = currency;  // Default value for currency
        this.current_balance = current_balance;  // Default value for balance
        this.date_creation = new Date();  // Default to current date
        this.date_update = new Date();  // Default to current date 
    }
}
