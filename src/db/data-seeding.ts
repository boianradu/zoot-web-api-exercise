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
        const wallet1 = new Wallet('1d4e7d81-ce9d-457b-b056-0f883baa783d', "active", 50, 500.00);
        wallet1.date_creation = new Date();
        wallet1.date_update = new Date();
        await walletRepository.save(wallet1);

        const wallet2 = new Wallet(null, "inactive", 20, 200.00);
        wallet2.date_creation = new Date();
        wallet2.date_update = new Date();
        await walletRepository.save(wallet2);

        const wallet3 = new Wallet(null, "active", 100, 1000.00);
        wallet3.date_creation = new Date();
        wallet3.date_update = new Date();
        await walletRepository.save(wallet3);

        const wallet4 = new Wallet(null, "inactive", 10, 50.00);
        wallet4.date_creation = new Date();
        wallet4.date_update = new Date();
        await walletRepository.save(wallet4);

        const wallet5 = new Wallet(null, "active", 200, 5000.00);
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

        // Insert Transaction History records// Create and insert transaction 1: Initial credit
        const transaction1 = new TransactionHistory(null, null, wallet1.id);
        transaction1.transaction_amount = 100.00;
        transaction1.status = 'completed';
        transaction1.resulted_balance = wallet1.current_balance + transaction1.transaction_amount;
        transaction1.date = new Date();
        await transactionRepository.save(transaction1);

        // Create and insert transaction 2: Duplicate credit
        const transaction2 = new TransactionHistory(null, null, wallet1.id);
        transaction2.transaction_amount = 100.00;
        transaction2.status = 'duplicate';
        transaction2.resulted_balance = wallet1.current_balance + transaction2.transaction_amount;
        transaction2.date = new Date();
        await transactionRepository.save(transaction2);

        // Create and insert transaction 3: Overdraft debit
        const transaction3 = new TransactionHistory(null, null, wallet1.id);
        transaction3.transaction_amount = 150.00;
        transaction3.status = 'pending';
        transaction3.resulted_balance = wallet1.current_balance - transaction3.transaction_amount;
        transaction3.date = new Date();
        await transactionRepository.save(transaction3);

        // Create and insert transaction 4: Valid debit
        const transaction4 = new TransactionHistory(null, null, wallet1.id);
        transaction4.transaction_amount = 50.00;
        transaction4.status = 'completed';
        transaction4.resulted_balance = wallet1.current_balance - transaction4.transaction_amount;
        transaction4.date = new Date();
        await transactionRepository.save(transaction4);

        // Create and insert transaction 5: Duplicate debit
        const transaction5 = new TransactionHistory(null, null, wallet1.id);
        transaction5.transaction_amount = 50.00;
        transaction5.status = 'duplicate';
        transaction5.resulted_balance = wallet1.current_balance - transaction5.transaction_amount;
        transaction5.date = new Date();
        await transactionRepository.save(transaction5);

        const transaction6 = new TransactionHistory(null, null, wallet2.id);
        transaction6.id_wallet = wallet1.id ?? -1;  // Linking to wallet1
        transaction6.transaction_amount = 150;
        transaction6.status = "successful";
        transaction6.resulted_balance = wallet1.current_balance + transaction6.transaction_amount;
        transaction6.date = new Date();
        await transactionRepository.save(transaction6);

        const transaction7 = new TransactionHistory(null, null, wallet3.id);
        transaction7.id_wallet = wallet3.id ?? -1;  // Linking to wallet3
        transaction7.transaction_amount = 300;
        transaction7.status = "successful";
        transaction7.resulted_balance = wallet3.current_balance + transaction7.transaction_amount;
        transaction7.date = new Date();
        await transactionRepository.save(transaction7);

        const transaction8 = new TransactionHistory(null, null, wallet4.id);
        transaction8.id_wallet = wallet5.id ?? -1;  // Linking to wallet4
        transaction8.transaction_amount = 2000;
        transaction8.status = "successful";
        transaction8.resulted_balance = wallet5.current_balance + transaction8.transaction_amount;
        transaction8.date = new Date();
        await transactionRepository.save(transaction8);

        const transaction9 = new TransactionHistory(null, null, wallet5.id);
        transaction9.id_wallet = wallet5.id ?? -1;  // Linking to wallet5
        transaction9.transaction_amount = 2300;
        transaction9.status = "successful";
        transaction9.resulted_balance = wallet5.current_balance + transaction9.transaction_amount;
        transaction9.date = new Date();
        await transactionRepository.save(transaction9);

        console.log("Transaction History created");

        console.log("Database seeding completed");
    } catch (error) {
        console.error("Error seeding the database:", error);
    }
}; 