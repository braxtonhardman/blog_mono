package bootstrap

import ( 
	"os"
)


type Env struct { 
	AppEnv                 string `mapstructure:"APP_ENV"`
	ServerAddress          string `mapstructure:"SERVER_ADDRESS"`
	FrontendAddress 	   string `mapstructure:"FRONTEND_ADDRESS"`
	DBHost                 string `mapstructure:"DB_HOST"`
	DBPort                 string `mapstructure:"DB_PORT"`
	DBUser                 string `mapstructure:"DB_USER"`
	DBPass                 string `mapstructure:"DB_PASS"`
	DBName                 string `mapstructure:"DB_NAME"`
	AccessTokenSecret      string `mapstructure:"ACCESS_TOKEN_SECRET"`
	AWS_ACCESS_KEY		   string `mapstructure:"AWS_ACCESS_KEY"`
	AWS_SECRET_KEY         string `mapstructure:"AWS_SECRET_KEY"`
	BUCKET_NAME			   string `mapstructure:"BUCKET_NAME"`
}


// This returns a pointer to the environment variable created in memory because we want to refrence the same 
// environment and not copy it every time. 
func NewEnv() *Env {

	return &Env { 
		AppEnv: os.Getenv("APP_ENV"),   
		ServerAddress: os.Getenv("SERVER_ADDRESS"),
		FrontendAddress: os.Getenv("FRONTEND_ADDRESS"),
		DBHost: os.Getenv("DB_HOST"),
		DBPort: os.Getenv("DB_PORT"),           
		DBUser: os.Getenv("DB_USER"),              
		DBPass: os.Getenv("DB_PASS"),                 
		DBName: os.Getenv("DB_NAME"),           
		AccessTokenSecret: os.Getenv("ACCESS_TOKEN_SECRET"),      
		AWS_ACCESS_KEY: os.Getenv("AWS_ACCESS_KEY"),	  
		AWS_SECRET_KEY: os.Getenv("AWS_SECRET_KEY"),
		BUCKET_NAME: os.Getenv("BUCKET_NAME"),
	}
}