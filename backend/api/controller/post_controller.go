package controller

import (
	"blog-backend/domain"
	"net/http"
	"github.com/gin-gonic/gin"
)

type PostController struct {
	PostUseCase domain.PostUseCase
}

type PostRequest struct {
	domain.Post
	Blocks []domain.Block `json:"blocks"`
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
