package route

import (
	"blog-backend/api/controller"
	"blog-backend/bootstrap"
	"blog-backend/repository"
	"blog-backend/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"blog-backend/services"
	"log"
	"blog-backend/api/middleware"
)

func NewProjectRouter(env *bootstrap.Env, db *gorm.DB, router *gin.RouterGroup) { 
	// Create a new post Repository
	pr := repository.NewProjectRepository(db)
	service, err := services.NewS3Service(env)

	if(err != nil) { 
		log.Fatal(err)
		return
	}
	pc := &controller.ProjectController{
		ProjectUseCase: usecase.NewProjectUseCase(pr),
		Service: service,
	}

	router.GET("/projects", pc.List)

	// Should all be protected routes
	router.POST("/projects/create", middleware.AuthenticateMiddleware(env), pc.CreateProject)
	router.POST("/projects/signedkey", middleware.AuthenticateMiddleware(env), pc.GetSignedURL)
	router.POST("/projects/public", middleware.AuthenticateMiddleware(env), pc.SetPublic)

}