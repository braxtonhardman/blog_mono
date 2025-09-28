package route

import (
	"blog-backend/api/controller"
	"blog-backend/bootstrap"
	"blog-backend/repository"
	"blog-backend/usecase"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func NewProjectRouter(env *bootstrap.Env, db *gorm.DB, router *gin.RouterGroup) { 
	// Create a new post Repository
	pr := repository.NewProjectRepository(db)

	pc := &controller.ProjectController{
		ProjectUseCase: usecase.NewProjectUseCase(pr),
		Env: env,
	}

	router.GET("/projects", pc.List)
	router.POST("/projects/create", pc.CreateProject)
	router.POST("/projects/signedkey", pc.GetSignedURL)
	router.POST("/projects/public", pc.SetPublic)

}