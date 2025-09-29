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
	router.POST("/projects/create", pc.CreateProject)
	router.POST("/projects/signedkey", pc.GetSignedURL)
	router.POST("/projects/public", pc.SetPublic)

}