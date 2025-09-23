package route 

import ( 
	"blog-backend/bootstrap"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"blog-backend/repository"
	"blog-backend/api/controller"
	"blog-backend/usecase"
)

func NewUserRouter(env *bootstrap.Env, db *gorm.DB, publicRouter *gin.RouterGroup) {

	// Create a new post Repository
	pr := repository.NewUserRepository(db)

	pc := &controller.UserController{
		UserUseCase: usecase.NewUserUseCase(pr),
		Env: env,
	}

	// Route to get all the posts
	publicRouter.POST("/users", pc.CreateUser)
	publicRouter.GET("/user", pc.FindUser)
	
}
