package route

import ( 
	"blog-backend/bootstrap"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Here we are passing by refrence as not to create a duplicate of the engine. 
func SetUp(env *bootstrap.Env, db *gorm.DB, gin *gin.Engine) { 
	// Create a group router for all the api functionalities
	// Both of these modify the same engine so we need to use the same engine for both of them.
	publicRouter := gin.Group("");

	// All Public API's  
	NewPostRouter(env, db, publicRouter);
	NewUserRouter(env, db, publicRouter) 

	// All Private API's behind middleware authentication 
	// protecedRoute := gin.Use()
	
}