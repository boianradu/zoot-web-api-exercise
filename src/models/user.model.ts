import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Wallet } from "./wallet.model"; // Import the Wallet entity

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column(("text"))
    name: string;

    @ManyToOne(() => Wallet, (wallet) => wallet.transactions, { nullable: true, onDelete: "SET NULL" })
    id_wallet: string | null;

    constructor(name: string = '', id_wallet: string) {
        this.name = name;
        this.id_wallet = id_wallet;  // Default to null if no wallet is set
    }
}
