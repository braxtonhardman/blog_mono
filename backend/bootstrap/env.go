package bootstrap

import ( 
	"log"
	"github.com/spf13/viper"
)


type Env struct { 
	AppEnv                 string `mapstructure:"APP_ENV"`
	ServerAddress          string `mapstructure:"SERVER_ADDRESS"`
	ContextTimeout         int    `mapstructure:"CONTEXT_TIMEOUT"`
	DBHost                 string `mapstructure:"DB_HOST"`
	DBPort                 string `mapstructure:"DB_PORT"`
	DBUser                 string `mapstructure:"DB_USER"`
	DBPass                 string `mapstructure:"DB_PASS"`
	DBName                 string `mapstructure:"DB_NAME"`
	AccessTokenExpiryHour  int    `mapstructure:"ACCESS_TOKEN_EXPIRY_HOUR"`
	RefreshTokenExpiryHour int    `mapstructure:"REFRESH_TOKEN_EXPIRY_HOUR"`
	AccessTokenSecret      string `mapstructure:"ACCESS_TOKEN_SECRET"`
	RefreshTokenSecret     string `mapstructure:"REFRESH_TOKEN_SECRET"`
	AWS_ACCESS_KEY		   string `mapstructure:"AWS_ACCESS_KEY"`
	AWS_SECRET_KEY         string `mapstructure:"AWS_SECRET_KEY"`
}


// This returns a pointer to the environment variable created in memory because we want to refrence the same 
// environment and not copy it every time. 
func NewEnv() *Env { 

	// Create a new empty environment struct object
	env := Env{}

	// Lets viper know the path where our configuration file is 
	viper.SetConfigFile("/home/braxton/Code/blog/backend/.env")

	// Read in the config file from memory searching in the defined path which we did above using SetConfigFile
	err := viper.ReadInConfig()

	// If there is an error the application shouldn't launch because that doesnt make sene to launch an application
	if(err != nil) { 
		// From the log package Fatal logs the error and does os.Exit(1) which is equivelant to a print and then an os.Exit
		log.Fatal("Error could not load the environment variables")
	}

	// Instead of creating an initializing a new variable using := we just re-use error and reassign the variable 
	// to save memory. Unmarshal attempts to take the .env config file and place that into the struct,
	// importantly it uses the struct tags to do this mapping. 
	err = viper.Unmarshal(&env)
	if(err != nil) { 
		log.Fatal("Unable to unmarshal the environment variables")
	}


	if env.AppEnv == "development" {
		log.Println("The App is running in development env")
	}
	// Importantly we want to return a pointer to the created enviromnet variable. Although it was created locally the go 
	// compiler is smart enough to recongnize that since we are returning the variable we want to continue to use the variable 
	// after the function has been disposed. This means that the function moves from the stack to the heap. 
	return &env
}
