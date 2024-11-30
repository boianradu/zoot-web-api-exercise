import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Wallet } from "./wallet.model"; // Import the Wallet entity 
import { randomUUID } from "crypto"
@Entity()
export class TransactionHistory {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column("text")
    t_id: string;

    @ManyToOne(() => Wallet, (wallet) => wallet.transactions, { nullable: true, onDelete: "SET NULL" })
    id_wallet: string | null; // This is the foreign key to the Wallet entity

    @Column("date")
    date: Date;

    @Column("float")
    transaction_amount: number;

    @Column("text")
    status: string;

    @Column("float")
    resulted_balance: number;

    constructor(id: string | null, t_id: string | null = null, id_wallet: string, transaction_amount: number = 0, status: string = '', resulted_balance: number = 0) {
        this.id = id ?? randomUUID()
        this.t_id = t_id ?? randomUUID()
        this.id_wallet = id_wallet;  // Wallet instance must be passed during initialization
        this.date = new Date();  // Default to current date
        this.transaction_amount = transaction_amount;  // Default value for transaction amount
        this.status = status;  // Default value for status (successful/unsuccessful)
        this.resulted_balance = resulted_balance;  // Default value for resulted balance
    }
}
