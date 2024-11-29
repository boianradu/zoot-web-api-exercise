# Web API exercise

The goal of this exercise is for you to build a simple HTTP Server that passes a set of provide automated scripts. The automated test scripts are provided as PostMan scripts and can be run from the command line with newman.
Requirements 

# How to run
## Start the services
Create the .env file from the .env.example file
``` sh
npm run db:run-create
npm run db:run-start
```

## DB structure
### Wallet
| Column Name       | Data Type | Description             |
|-------------------|-----------|-------------------------|
| id                | INT       | Unique, auto-incrementing ID |
| status            | VARCHAR   | Active/Inactive status  |
| currency          | VARCHAR   | Type of currency        |
| current_balance   | FLOAT     | Current wallet balance  |
| date_creation     | DATE      | Date the wallet was created |
| date_update       | DATE      | Date of the last update |


### User
| Column Name | Data Type | Description                     |
|-------------|-----------|---------------------------------|
| id          | INT       | Unique, auto-incrementing ID    |
| name        | VARCHAR   | Name of the user               |
| id_wallets  | INT       | Foreign key to `Wallet.id`     |


### Transaction history
| Column Name        | Data Type | Description                                |
|--------------------|-----------|--------------------------------------------|
| id                 | INT       | Unique, auto-incrementing ID               |
| id_wallet          | INT       | Foreign key to `Wallet.id`                 |
| date               | DATE      | Date of the transaction                    |
| transaction_amount | FLOAT     | Amount involved in the transaction         |
| status             | VARCHAR   | Transaction status (successful/unsuccessful) |
| resulted_balance   | FLOAT     | Balance after the transaction              |



## APIs endpoints






