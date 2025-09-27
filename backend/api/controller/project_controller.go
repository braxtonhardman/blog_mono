package controller

import (
	"blog-backend/domain"
	"net/http"
	"github.com/gin-gonic/gin"
	"blog-backend/bootstrap"
	"fmt"
	"context"
    "github.com/aws/aws-sdk-go-v2/config"
    "github.com/aws/aws-sdk-go-v2/credentials"
    "github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/aws"
)


type ProjectController struct {
	ProjectUseCase domain.ProjectUseCase
	Env *bootstrap.Env
}


func (c *ProjectController) GetSignedURL(ctx *gin.Context) { 
	
	creds := credentials.NewStaticCredentialsProvider(c.Env.AWS_ACCESS_KEY, c.Env.AWS_SECRET_KEY, "")

	cfg, err := config.LoadDefaultConfig(
		context.TODO(),
		config.WithRegion("us-east-1"),
		config.WithCredentialsProvider(creds),
	)
	if err != nil {
		// handle error
		fmt.Println(err)
	}

	s3 := s3.NewFromConfig(
		cfg, 
		o.EndpointResolverV2 = &resolverV2{
			o.BaseEndpoint = aws.String("localhost:8080"),
        }
	)
}

func(c *ProjectController) CreateProject(ctx *gin.Context) { 
	var project domain.Project
	err := ctx.BindJSON(&project)
	if(err != nil) { 
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to create project"})
		return
	}

	err = c.ProjectUseCase.CreateProject(&project)
	if(err != nil) { 
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to create project"})
		return
	}

	ctx.JSON(http.StatusOK, domain.SucessResponse{Message: "Project Created Sucessfully"})
}

func(c *ProjectController) List(ctx *gin.Context) { 
	projects, err := c.ProjectUseCase.List()
	if(err != nil) { 
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Could not load projects"})
		return
	}

	ctx.JSON(http.StatusOK, &projects)
}
 
