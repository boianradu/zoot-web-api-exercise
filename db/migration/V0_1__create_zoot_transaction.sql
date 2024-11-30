-- Create the Transaction History table
CREATE TABLE IF NOT EXISTS wallet.Transaction (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    -- unique ID for each transaction
    PRIMARY KEY (id),
    t_id TEXT NOT NULL,
    -- unique transaction ID
    id_wallet UUID NOT NULL,
    -- foreign key referencing Wallet.id
    date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    -- transaction date
    transaction_amount FLOAT NOT NULL,
    -- transaction amount
    status TEXT CHECK (status IN ('successful', 'unsuccessful')),
    -- transaction status
    resulted_balance FLOAT NOT NULL,
    CONSTRAINT fk_transaction_wallet FOREIGN KEY (id_wallet) REFERENCES wallet.Wallet(id) ON DELETE CASCADE
);