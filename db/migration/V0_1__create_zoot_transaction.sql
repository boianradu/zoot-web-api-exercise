-- Create the Transaction History table
CREATE TABLE IF NOT EXISTS wallet.Transaction (
    id SERIAL PRIMARY KEY, -- unique, auto-incrementing
    id_wallet INT NOT NULL, -- foreign key referencing Wallet.id
    date DATE NOT NULL DEFAULT CURRENT_DATE, -- date of the transaction
    transaction_amount FLOAT NOT NULL, -- transaction amount
    status text  CHECK (status IN ('successful', 'unsuccessful')), -- status of the transaction
    resulted_balance FLOAT NOT NULL, -- balance after the transaction
    CONSTRAINT fk_transaction_wallet FOREIGN KEY (id_wallet) REFERENCES wallet.Wallet(id) ON DELETE CASCADE
);
