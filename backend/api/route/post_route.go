package route

import (
	"blog-backend/api/controller"
	"blog-backend/bootstrap"
	"blog-backend/repository"
	"blog-backend/usecase"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewPostRouter(env *bootstrap.Env, db *gorm.DB, publicRouter *gin.RouterGroup) {

	// Create a new post Repository
	pr := repository.NewPostRepository(db)

	pc := &controller.PostController{
		PostUseCase: usecase.NewPostUseCase(pr),
	}

	// Route to get all the posts
	publicRouter.GET("/posts", pc.List)

	// Route to create a new post
	publicRouter.POST("/posts/create", pc.CreatePost)


	// Get all the post by title 
	publicRouter.GET("/posts/:title", pc.GetPost)
}
