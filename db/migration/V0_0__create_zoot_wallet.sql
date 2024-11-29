-- Create the Wallet table
CREATE TABLE IF NOT EXISTS wallet.Wallet (
    id UUID NOT NULL PRIMARY KEY, -- unique 
    status text  CHECK (status IN ('active', 'inactive')), -- active/inactive
    currency text  NOT NULL, -- to store the type of currency (e.g., USD, EUR)
    current_balance FLOAT DEFAULT 0.0, -- current balance, defaulting to 0
    date_creation DATE NOT NULL DEFAULT CURRENT_DATE, -- date of creation
    date_update DATE NOT NULL DEFAULT CURRENT_DATE -- date of the last update
);