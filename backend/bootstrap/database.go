package bootstrap

import (
	"blog-backend/postgres"
	"gorm.io/gorm"
)


func NewPostgresDB(env *Env) (*gorm.DB, error){ 

	db, err := postgres.Open(env.DBHost, env.DBUser, env.DBPass, env.DBName, env.DBPort)

	if(err != nil) { 
		return nil, err
	}

	postgres.InitTables(db)
	
	
	return db, nil
}

func ClosePostgresDB() { 
	
}

