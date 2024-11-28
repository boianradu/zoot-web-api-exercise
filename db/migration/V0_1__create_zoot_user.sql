-- Create the User table
CREATE TABLE IF NOT EXISTS wallet.User (
    id SERIAL PRIMARY KEY, -- unique, auto-incrementing
    name VARCHAR(100) NOT NULL, -- user name
    id_wallet INT, -- foreign key referencing Wallet.id
    CONSTRAINT fk_wallet FOREIGN KEY (id_wallet) REFERENCES wallet.Wallet(id) ON DELETE SET NULL
);
 