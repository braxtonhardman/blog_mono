package controller

import (
	"blog-backend/api/middleware"
	"blog-backend/bootstrap"
	"blog-backend/domain"
	"fmt"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

type UserController struct {
	UserUseCase domain.UserUseCase
	Env *bootstrap.Env
}

func (uc *UserController) CreateUser(c *gin.Context) {

	var user domain.User

	err := c.BindJSON(&user)

	if(err != nil) { 
		c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to bind to user"})
		return
	}

	err = uc.UserUseCase.Create(&user)

	if(err != nil) { 
		c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to create user"})
		return
	}

}

func (uc* UserController) FindUser(c *gin.Context) { 
	email := c.Query("email")

	user, error := uc.UserUseCase.FindUser(email)

	if(error != nil) { 
		c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to find user"})
		return
	}

	c.JSON(http.StatusOK, &user)
}

func (uc* UserController) Login (c *gin.Context) { 

	var loginRequest struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}	

	err := c.BindJSON(&loginRequest)

	if(err != nil) { 
		c.JSON(http.StatusInternalServerError, domain.ErrorResponse{Message: "Failed to bind to user"})
		return 
	}

	tempUser, err := uc.UserUseCase.FindUser(loginRequest.Email)
	
	if(err != nil) { 
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Message: "Invalid login information"})
		return
	}

	// Make sure hashed passwords match 
	err = bcrypt.CompareHashAndPassword([]byte(tempUser.Password), []byte(loginRequest.Password))
	if(err != nil) { 
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Message: "Incorrect Login Information"})
		return 
	}
	
	// Create JWT token 
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub": tempUser.Email,
		"exp": time.Now().Add(time.Hour * 2).Unix(),
	})
	
	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(uc.Env.AccessTokenSecret))
	if(err != nil) { 
		c.JSON(http.StatusBadRequest, domain.ErrorResponse{Message: "Unable to create token"})
		return 
	}

	// Save Token in cookie 
	c.SetSameSite(http.SameSiteNoneMode) // allow cross-site cookies
	c.SetCookie(
		"Authorization",
		tokenString,
		3600*2,
		"/",                  // path
		"braxtonhardman.com",          // domain (matches frontend if needed)
		true,                // secure
		true,                 // HttpOnly
	)}

func (uc *UserController) Me(c *gin.Context) {
    tokenString, err := c.Cookie("Authorization")
    if err != nil {
        c.JSON(401, gin.H{"authenticated": false})
        return
    }

    _, err = middleware.VerifyToken(tokenString, uc.Env)
    if err != nil {
		fmt.Println(err)
        c.JSON(401, gin.H{"authenticated": false})
        return
    }

    c.JSON(200, gin.H{"authenticated": true})
}
