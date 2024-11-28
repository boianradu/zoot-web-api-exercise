import { DataSource } from "typeorm";
import { Wallet } from "../models/wallet.model";
import { User } from "../models/user.model";
import { TransactionHistory } from "../models/transaction.model";
import { envs } from "../core/config/env"

export const AppDataSource = new DataSource({
    type: "postgres",
    port: 5432,
    username: envs.DB_USER,
    password: envs.DB_PASS,
    database: envs.DB_NAME,
    host: envs.DB_HOST,
    synchronize: true,
    logging: false,
    entities: [Wallet, User, TransactionHistory],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
