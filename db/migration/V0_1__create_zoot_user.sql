-- Create the User table
CREATE TABLE IF NOT EXISTS wallet.User (
    id SERIAL PRIMARY KEY, -- unique, auto-incrementing
    id_wallet UUID, -- foreign key referencing Wallet.id
    name VARCHAR(100) NOT NULL, -- user name
    CONSTRAINT fk_wallet FOREIGN KEY (id_wallet) REFERENCES wallet.Wallet(id) ON DELETE SET NULL
);
 