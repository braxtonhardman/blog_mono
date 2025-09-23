This file should apply some application logic to the database meaning that after the controller formats and sends 
the appropriate information to the usecase the usecase should do additional checks such as uniqueness of post titles 
and call then the repository which is responsible for the core implementation of the interactions with the database. 
All the repository knows is CRUD operations to interact with the database. Then the postgres database defines the 
infastructure setup of the DB and nothing else.

Important Packages
Gin --- 
Handles routing as well as a way to streamline requests and respsonses quickly 
Viper --- 
Viper loads environment variables allowing for server to be configuered from a single file
Gorm --- 
ORM that interacts with the postgres database 
