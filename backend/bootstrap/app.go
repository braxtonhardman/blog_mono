package bootstrap

import ( 
	"log"
	"gorm.io/gorm"
)


type Application struct { 
	Env *Env // Environment variables using Viper
	Db *gorm.DB // DB connection 
}

func App() *Application { 
	env := NewEnv() 

	db, err := NewPostgresDB(env)

	if(err != nil) { 
		log.Fatal(err)
	}

	// Struct Literal 
	return &Application{ 
		env,
		db, 
	}
}



