import { DataSource } from "typeorm";
import { Wallet } from "../models/wallet.model";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "your_username",
    password: "your_password",
    database: "your_database",
    synchronize: true,
    logging: false,
    entities: [Wallet],
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
