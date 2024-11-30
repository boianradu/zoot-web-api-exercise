-- Create the Wallet table
CREATE TABLE IF NOT EXISTS wallet.Wallet (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    -- Use the uuid_generate_v4() function for default values
    PRIMARY KEY (id),
    status text CHECK (status IN ('active', 'inactive')),
    -- active/inactive
    currency text NOT NULL,
    -- to store the type of currency (e.g., USD, EUR)
    version INT NOT NULL,
    -- to track the version of the wallet
    current_balance FLOAT DEFAULT 0.0,
    -- current balance, defaulting to 0
    date_creation TIMESTAMP NOT NULL DEFAULT CURRENT_DATE,
    -- date of creation
    date_update TIMESTAMP NOT NULL DEFAULT CURRENT_DATE -- date of the last update
);