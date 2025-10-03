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

	// Create a new empty environment struct object
	env := Env{}

	viper.SetConfigFile(".env")   // load local .env

	// Read in the config file from memory searching in the defined path which we did above using SetConfigFile
	viper.AutomaticEnv()          // override with environment variables
	if err := viper.ReadInConfig(); err != nil {
		log.Println("No local .env file found, relying on environment variables")
	}

	// Map environment variables to struct
	if err := viper.Unmarshal(&env); err != nil {
		log.Fatalf("Failed to unmarshal environment variables: %v", err)
	}

	// Log if in development
	if env.AppEnv == "development" {
		log.Println("The App is running in development environment")
	}

	return &env

}
