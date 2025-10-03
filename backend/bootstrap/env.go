package bootstrap

import ( 
	"log"
	"github.com/spf13/viper"
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
	viper.AutomaticEnv() // read all OS env variables

	var env Env
	if err := viper.Unmarshal(&env); err != nil {
		log.Fatalf("Failed to unmarshal environment variables: %v", err)
	}

	if env.AppEnv == "development" {
		log.Println("The App is running in development environment")
	}

	log.Printf("DB Host: %s, Port: %s\n", env.DBHost, env.DBPort) // verify
	return &env
}