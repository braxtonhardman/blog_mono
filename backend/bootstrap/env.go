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

	if env.AppEnv == "development" {
		log.Println("The App is running in development env")
	}
	// Importantly we want to return a pointer to the created enviromnet variable. Although it was created locally the go 
	// compiler is smart enough to recongnize that since we are returning the variable we want to continue to use the variable 
	// after the function has been disposed. This means that the function moves from the stack to the heap. 
	return &env
}
