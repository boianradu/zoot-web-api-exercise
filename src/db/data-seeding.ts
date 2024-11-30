// import { PrismaClient } from "@prisma/client"; // Import PrismaClient
// import { randomUUID } from "crypto";

// const prisma = new PrismaClient();

// export const seedDatabase = async () => {
//     try {
//         // Insert Wallets
//         const wallet1 = await prisma.wallet.create({
//             data: {
//                 id: '1d4e7d81-ce9d-457b-b056-0f883baa783d',
//                 status: 'active',
//                 currency: 'eur',
//                 current_balance: 50,
//                 date_creation: new Date(),
//                 date_update: new Date(),
//                 version: 1,
//             },
//         });

//         const wallet2 = await prisma.wallet.create({
//             data: {
//                 status: 'inactive',
//                 currency: 'eur',
//                 current_balance: 20,
//                 date_creation: new Date(),
//                 date_update: new Date(),
//                 version: 1,
//             },
//         });

//         const wallet3 = await prisma.wallet.create({
//             data: {
//                 status: 'active',
//                 currency: 'eur',
//                 current_balance: 100,
//                 date_creation: new Date(),
//                 date_update: new Date(),
//                 version: 1,
//             },
//         });

//         const wallet4 = await prisma.wallet.create({
//             data: {
//                 status: 'inactive',
//                 currency: 'eur',
//                 current_balance: 10,
//                 date_creation: new Date(),
//                 date_update: new Date(),
//                 version: 1,
//             },
//         });

//         const wallet5 = await prisma.wallet.create({
//             data: {
//                 status: 'active',
//                 currency: 'eur',
//                 current_balance: 200,
//                 date_creation: new Date(),
//                 date_update: new Date(),
//                 version: 1,
//             },
//         });

//         console.log("Wallets created");

//         // Insert Users linked to the wallets
//         const user1 = await prisma.user.create({
//             data: {
//                 name: 'John Doe',
//                 wallet: { connect: { id: wallet1.id } },
//             },
//         });

//         const user2 = await prisma.user.create({
//             data: {
//                 name: 'Jane Doe',
//                 wallet: { connect: { id: wallet2.id } },
//             },
//         });

//         const user3 = await prisma.user.create({
//             data: {
//                 name: 'Alice Smith',
//                 wallet: { connect: { id: wallet3.id } },
//             },
//         });

//         const user4 = await prisma.user.create({
//             data: {
//                 name: 'Bob Johnson',
//                 wallet: { connect: { id: wallet4.id } },
//             },
//         });

//         const user5 = await prisma.user.create({
//             data: {
//                 name: 'Charlie Brown',
//                 wallet: { connect: { id: wallet5.id } },
//             },
//         });

//         console.log("Users created");

//         // Insert Transaction History records
//         const transaction1 = await prisma.transaction.create({
//             data: {
//                 t_id: randomUUID(),
//                 wallet: { connect: { id: wallet1.id } },
//                 transaction_amount: 100.00,
//                 status: 'completed',
//                 resulted_balance: wallet1.current_balance + 100.00,
//                 date: new Date(),
//             },
//         });

//         const transaction2 = await prisma.transaction.create({
//             data: {
//                 t_id: randomUUID(),
//                 wallet: { connect: { id: wallet1.id } },
//                 transaction_amount: 100.00,
//                 status: 'duplicate',
//                 resulted_balance: wallet1.current_balance + 100.00,
//                 date: new Date(),
//             },
//         });

//         const transaction3 = await prisma.transaction.create({
//             data: {
//                 t_id: randomUUID(),
//                 wallet: { connect: { id: wallet1.id } },
//                 transaction_amount: 150.00,
//                 status: 'pending',
//                 resulted_balance: wallet1.current_balance - 150.00,
//                 date: new Date(),
//             },
//         });

//         const transaction4 = await prisma.transaction.create({
//             data: {
//                 t_id: randomUUID(),
//                 wallet: { connect: { id: wallet1.id } },
//                 transaction_amount: 50.00,
//                 status: 'completed',
//                 resulted_balance: wallet1.current_balance - 50.00,
//                 date: new Date(),
//             },
//         });

//         const transaction5 = await prisma.transaction.create({
//             data: {
//                 t_id: randomUUID(),
//                 wallet: { connect: { id: wallet1.id } },
//                 transaction_amount: 50.00,
//                 status: 'duplicate',
//                 resulted_balance: wallet1.current_balance - 50.00,
//                 date: new Date(),
//             },
//         });

//         const transaction6 = await prisma.transaction.create({
//             data: {
//                 t_id: randomUUID(),
//                 wallet: { connect: { id: wallet2.id } },
//                 transaction_amount: 150.00,
//                 status: 'successful',
//                 resulted_balance: wallet2.current_balance + 150.00,
//                 date: new Date(),
//             },
//         });

//         const transaction7 = await prisma.transaction.create({
//             data: {
//                 t_id: randomUUID(),
//                 wallet: { connect: { id: wallet3.id } },
//                 transaction_amount: 300.00,
//                 status: 'successful',
//                 resulted_balance: wallet3.current_balance + 300.00,
//                 date: new Date(),
//             },
//         });

//         const transaction8 = await prisma.transaction.create({
//             data: {
//                 t_id: randomUUID(),
//                 wallet: { connect: { id: wallet4.id } },
//                 transaction_amount: 2000.00,
//                 status: 'successful',
//                 resulted_balance: wallet4.current_balance + 2000.00,
//                 date: new Date(),
//             },
//         });

//         const transaction9 = await prisma.transaction.create({
//             data: {
//                 t_id: randomUUID(),
//                 wallet: { connect: { id: wallet5.id } },
//                 transaction_amount: 2300.00,
//                 status: 'successful',
//                 resulted_balance: wallet5.current_balance + 2300.00,
//                 date: new Date(),
//             },
//         });

//         console.log("Transaction History created");

//         console.log("Database seeding completed");
//     } catch (error) {
//         console.error("Error seeding the database:", error);
//     } finally {
//         await prisma.$disconnect();
//     }
// };
