import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Wallet } from "./wallet.model"; // Import the Wallet entity

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column(("text"))
    name: string;

    @ManyToOne(() => Wallet, (wallet) => wallet.transactions, { nullable: true, onDelete: "SET NULL" })
    id_wallet: number | null;

    constructor(name: string = '', id_wallet: number | null = null) {
        this.name = name;  // Default value for name (you can set a real value in practice)
        this.id_wallet = id_wallet;  // Default to null if no wallet is set
    }
}
