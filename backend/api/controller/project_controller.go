package controller

import (
	"blog-backend/bootstrap"
	"blog-backend/domain"
	"context"
	"net/http"
	"time"
	"fmt"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/gin-gonic/gin"
)


type ProjectController struct {
	ProjectUseCase domain.ProjectUseCase
	Env *bootstrap.Env
}

func (c *ProjectController) SetPublic(ctx *gin.Context) { 
	var fileKey string 

	err := ctx.BindJSON(&fileKey)

	if(err != nil) { 
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Error getting fileKey"})
		return
	}

	// Create custom credentials provider
	creds := credentials.NewStaticCredentialsProvider(c.Env.AWS_ACCESS_KEY, c.Env.AWS_SECRET_KEY, "")

	// Load config with DigitalOcean Spaces endpoint
	cfg, err := config.LoadDefaultConfig(
		context.TODO(),
		config.WithCredentialsProvider(creds),
		config.WithRegion("us-east-1"),
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Error create aws client"})
		return
	}

	// Create S3 client
	client := s3.NewFromConfig(cfg, func (o *s3.Options) {
		o.BaseEndpoint = aws.String("https://sfo3.digitaloceanspaces.com")
	})

	bucket := c.Env.BUCKET_NAME

	_, err = client.PutObjectAcl(context.TODO(), &s3.PutObjectAclInput{
		Bucket: &bucket,
		Key:    &fileKey,
		ACL:    types.ObjectCannedACLPublicRead,
	})
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to set object public"})
		return
	}
	
	ctx.JSON(http.StatusOK, gin.H{"url": fmt.Sprintf("https://%s.%s/%s", bucket, "sfo3.digitaloceanspaces.com", fileKey)})
}

func (c *ProjectController) GetSignedURL(ctx *gin.Context) { 
	
	var fileKey string 

	err := ctx.BindJSON(&fileKey)

	if(err != nil) { 
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Error getting fileKey"})
		return
	}

	// Create custom credentials provider
	creds := credentials.NewStaticCredentialsProvider(c.Env.AWS_ACCESS_KEY, c.Env.AWS_SECRET_KEY, "")

	// Load config with DigitalOcean Spaces endpoint
	cfg, err := config.LoadDefaultConfig(
		context.TODO(),
		config.WithCredentialsProvider(creds),
		config.WithRegion("us-east-1"),
	)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Error create aws client"})
		return
	}

	// Create S3 client
	client := s3.NewFromConfig(cfg, func (o *s3.Options) {
		o.BaseEndpoint = aws.String("https://sfo3.digitaloceanspaces.com")
	})

	// New Presign Client
	presignClient := s3.NewPresignClient(client)

	bucket := c.Env.BUCKET_NAME

	httpReq, err := presignClient.PresignPutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: &bucket,
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
 
