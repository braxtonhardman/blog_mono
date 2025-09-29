package controller

import (
	"blog-backend/domain"
	"blog-backend/services"
	"context"
	"net/http"
	"time"
	"fmt"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/gin-gonic/gin"
)


type ProjectController struct {
	ProjectUseCase domain.ProjectUseCase
	Service *services.S3Service
}

func (c *ProjectController) SetPublic(ctx *gin.Context) { 
	var fileKey string 

	err := ctx.BindJSON(&fileKey)

	if(err != nil) { 
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Error getting fileKey"})
		return
	}

	_, err = c.Service.Client.PutObjectAcl(context.TODO(), &s3.PutObjectAclInput{
		Bucket: &c.Service.Bucket,
		Key:    &fileKey,
		ACL:    types.ObjectCannedACLPublicRead,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to set object public"})
		return
	}
	
	ctx.JSON(http.StatusOK, gin.H{"url": fmt.Sprintf("https://%s.%s/%s", c.Service.Bucket, "sfo3.digitaloceanspaces.com", fileKey)})
}

func (c *ProjectController) GetSignedURL(ctx *gin.Context) { 
	
	var fileKey string 

	err := ctx.BindJSON(&fileKey)

	if(err != nil) { 
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Error getting fileKey"})
		return
	}

	client := c.Service.Client

	// New Presign Client
	presignClient := s3.NewPresignClient(client)

	httpReq, err := presignClient.PresignPutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: &c.Service.Bucket,
		Key: &fileKey,
	}, s3.WithPresignExpires(5*time.Minute))

	if(err != nil) { 
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Error signing client"})
		return
	}

	ctx.JSON(http.StatusOK, httpReq)

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
 
