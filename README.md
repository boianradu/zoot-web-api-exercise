# Web API exercise

The goal of this exercise is for you to build a simple HTTP Server that passes a set of provide automated scripts. The automated test scripts are provided as PostMan scripts and can be run from the command line with newman.
Requirements 



## DB structure
### Wallet
id - unique; inc
status - active/inactive; str 
currency - float
current_balance - float
date_creation - date
date_update - date

### User
id- unique, int 
name - str
id_wallets int, fk to Wallet.id

### Transaction history
id - unique, int
id_wallet - int, fk to Wallet.id
date - date
transaction_amount - float
status - str, successful/unsuccesful
resulted_balance - float


## APIs endpoints






