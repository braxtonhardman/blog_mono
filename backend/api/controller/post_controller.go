package controller

import (
	"blog-backend/domain"
	"net/http"

	"github.com/gin-gonic/gin"
)

// This is at the edge of the application which translates HTTP messages into a format the rest of the application can
// understand
type PostController struct {
	PostUseCase domain.PostUseCase
}

// Both of these functions operate on the PostControllers struct
// Get all posts from the database gin.Context implements both the writer and the request
func (c *PostController) List(gin *gin.Context) {
	// Call use case to get posts
	posts, err := c.PostUseCase.List()
	if err != nil {
		gin.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to fetch posts"})
		return
	}

	// Return posts as JSON
	gin.JSON(http.StatusOK, posts)
}

// Create a post in the database should be authenticated so that only authenticated users can create posts
func (c *PostController) CreatePost(gin *gin.Context) {
	// Parse JSON request body into Post struct
	var post domain.Post

	if err := gin.Bind(&post); err != nil {return}
		
	// Call use case to create post
	err := c.PostUseCase.Create(&post)
	if err != nil {
		gin.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to create post"})
		return
	}

	// Return created post as JSON
	gin.JSON(http.StatusCreated, post)
}
