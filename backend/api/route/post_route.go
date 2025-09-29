package route

import (
	"blog-backend/api/controller"
	"blog-backend/bootstrap"
	"blog-backend/repository"
	"blog-backend/usecase"
	"blog-backend/services"
	"log"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewPostRouter(env *bootstrap.Env, db *gorm.DB, router *gin.RouterGroup) {

	// Create a new post Repository
	pr := repository.NewPostRepository(db)
	service, err := services.NewS3Service(env)

	if(err != nil) { 
		log.Fatal(err)
		return
	}
	pc := &controller.PostController{
		PostUseCase: usecase.NewPostUseCase(pr),
		Service: service,
	}

	// Route to get all the posts
	router.GET("/posts", pc.List)
	// Get post by title 
	router.GET("/posts/:title", pc.GetPost)

	// Should all be portected
	// Route to create a new post
	router.POST("/posts/create", pc.CreatePost)

	router.POST("/posts/signedkey", pc.GetSignedURL)
	router.POST("/posts/public", pc.SetPublic)
	
}
