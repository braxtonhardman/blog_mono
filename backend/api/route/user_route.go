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
	publicRouter.POST("/user/create", pc.CreateUser)
	publicRouter.POST("/user/login", pc.Login)
	publicRouter.GET("/user/me", pc.Me)
	
}
