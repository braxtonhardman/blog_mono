package controller

import (
	"blog-backend/domain"
	"blog-backend/services"
	"net/http"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/s3/types"
	"github.com/gin-gonic/gin"
	"context"
	"time"
	"fmt"
)

type PostController struct {
	PostUseCase domain.PostUseCase
	Service *services.S3Service
}

type PostRequest struct {
	domain.Post
	Blocks []domain.Block `json:"blocks"`
}

func (c *PostController) SetPublic(ctx *gin.Context) { 
	var fileKey string 

	err := ctx.BindJSON(&fileKey)

	if(err != nil) { 
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Error getting the filekey"})
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

func (c *PostController) GetSignedURL(ctx *gin.Context) { 
	
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

func (c *PostController) List(ctx *gin.Context) {
	posts, err := c.PostUseCase.List()
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to fetch posts"})
		return
	}
	ctx.JSON(http.StatusOK, posts)
}

func (c *PostController) CreatePost(ctx *gin.Context) {
	var req PostRequest
	if err := ctx.ShouldBind(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, domain.ErrorResponse{Message: "Invalid request"})
		return
	}

	tempPost := domain.Post{
		ID: req.ID,
		Title: req.Title,
		Description: req.Description,
		ReadTime: req.ReadTime,
		CreatedAt: req.CreatedAt,
		UpdatedAt: req.UpdatedAt,
		DeletedAt: req.DeletedAt,
	}

	createdPost, err := c.PostUseCase.Create(&tempPost)

	if(err != nil){
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to create post"})
		return
	}

	if(len(req.Blocks) != 0) { 
		err := c.PostUseCase.CreateBlocks(req.Blocks, createdPost.ID)
		if(err != nil) { 
			ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to create post"})
			return
		}
	}
	
	ctx.JSON(http.StatusCreated, req.Post)
}

func (c *PostController) GetPost(ctx *gin.Context) {
	postTitle := ctx.Param("title")
	post, err := c.PostUseCase.GetPost(postTitle)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to get post"})
		return
	}
	ctx.JSON(http.StatusOK, post)
}
