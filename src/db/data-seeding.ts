import { AppDataSource } from "./db";
import { Wallet } from "../models/wallet.model";  // Adjust with the correct path
import { User } from "../models/user.model";  // Adjust with the correct path
import { TransactionHistory } from "../models/transaction.model";  // Adjust with the correct path

export const seedDatabase = async () => {
    try {
        // Initialize the data source
        await AppDataSource.initialize();


        const walletRepository = AppDataSource.getRepository(Wallet);
        const userRepository = AppDataSource.getRepository(User);
        const transactionRepository = AppDataSource.getRepository(TransactionHistory);

        // Insert Wallets
        const wallet1 = new Wallet("active", 50, 500.00);
        wallet1.date_creation = new Date();
        wallet1.date_update = new Date();
        await walletRepository.save(wallet1);

        const wallet2 = new Wallet("inactive", 20, 200.00);
        wallet2.date_creation = new Date();
        wallet2.date_update = new Date();
        await walletRepository.save(wallet2);

        const wallet3 = new Wallet("active", 100, 1000.00);
        wallet3.date_creation = new Date();
        wallet3.date_update = new Date();
        await walletRepository.save(wallet3);

        const wallet4 = new Wallet("inactive", 10, 50.00);
        wallet4.date_creation = new Date();
        wallet4.date_update = new Date();
        await walletRepository.save(wallet4);

        const wallet5 = new Wallet("active", 200, 5000.00);
        wallet5.date_creation = new Date();
        wallet5.date_update = new Date();
        await walletRepository.save(wallet5);

        console.log("Wallets created");

        // Insert Users linked to the wallets
        const user1 = new User("John Doe", wallet1.id);
        await userRepository.save(user1);

        const user2 = new User("Jane Doe", wallet2.id);
        await userRepository.save(user2);

        const user3 = new User("Alice Smith", wallet3.id);
        await userRepository.save(user3);

        const user4 = new User("Bob Johnson", wallet4.id);
        await userRepository.save(user4);

        const user5 = new User("Charlie Brown", wallet5.id);
        await userRepository.save(user5);

        const user6 = new User("David Lee", wallet1.id);  // User 6 using the first wallet
        await userRepository.save(user6);

        const user7 = new User("Eva White", wallet2.id);  // User 7 using the second wallet
        await userRepository.save(user7);

        console.log("Users created");

        // Insert Transaction History records
        const transaction1 = new TransactionHistory();
        transaction1.id_wallet = wallet1.id ?? -1;  // Linking to wallet1
        transaction1.transaction_amount = 100;
        transaction1.status = "successful";
        transaction1.resulted_balance = wallet1.current_balance + transaction1.transaction_amount;
        transaction1.date = new Date();
        await transactionRepository.save(transaction1);

        const transaction2 = new TransactionHistory();
        transaction2.id_wallet = wallet2.id ?? -1;  // Linking to wallet2
        transaction2.transaction_amount = 50;
        transaction2.status = "successful";
        transaction2.resulted_balance = wallet2.current_balance + transaction2.transaction_amount;
        transaction2.date = new Date();
        await transactionRepository.save(transaction2);

        const transaction3 = new TransactionHistory();
        transaction3.id_wallet = wallet3.id ?? -1;  // Linking to wallet3
        transaction3.transaction_amount = 500;
        transaction3.status = "failed";
        transaction3.resulted_balance = wallet3.current_balance - transaction3.transaction_amount;
        transaction3.date = new Date();
        await transactionRepository.save(transaction3);

        const transaction4 = new TransactionHistory();
        transaction4.id_wallet = wallet4.id ?? -1;  // Linking to wallet4
        transaction4.transaction_amount = 20;
        transaction4.status = "successful";
        transaction4.resulted_balance = wallet4.current_balance + transaction4.transaction_amount;
        transaction4.date = new Date();
        await transactionRepository.save(transaction4);

        const transaction5 = new TransactionHistory();
        transaction5.id_wallet = wallet5.id ?? -1;  // Linking to wallet5
        transaction5.transaction_amount = 1000;
        transaction5.status = "successful";
        transaction5.resulted_balance = wallet5.current_balance + transaction5.transaction_amount;
        transaction5.date = new Date();
        await transactionRepository.save(transaction5);

        const transaction6 = new TransactionHistory();
        transaction6.id_wallet = wallet1.id ?? -1;  // Linking to wallet1
        transaction6.transaction_amount = 150;
        transaction6.status = "successful";
        transaction6.resulted_balance = wallet1.current_balance + transaction6.transaction_amount;
        transaction6.date = new Date();
        await transactionRepository.save(transaction6);

        const transaction7 = new TransactionHistory();
        transaction7.id_wallet = wallet3.id ?? -1;  // Linking to wallet3
        transaction7.transaction_amount = 300;
        transaction7.status = "successful";
        transaction7.resulted_balance = wallet3.current_balance + transaction7.transaction_amount;
        transaction7.date = new Date();
        await transactionRepository.save(transaction7);

        const transaction8 = new TransactionHistory();
        transaction8.id_wallet = wallet5.id ?? -1;  // Linking to wallet5
        transaction8.transaction_amount = 2000;
        transaction8.status = "successful";
        transaction8.resulted_balance = wallet5.current_balance + transaction8.transaction_amount;
        transaction8.date = new Date();
        await transactionRepository.save(transaction8);

        console.log("Transaction History created");

        console.log("Database seeding completed");
    } catch (error) {
        console.error("Error seeding the database:", error);
    }
}; 