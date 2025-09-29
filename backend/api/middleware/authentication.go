package middleware

import (
	"blog-backend/bootstrap"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func AuthenticateMiddleware(env *bootstrap.Env) gin.HandlerFunc {
    return func(c *gin.Context) {
        // Retrieve the token from cookie
        tokenString, err := c.Cookie("Authorization")
        if err != nil {
            c.JSON(401, gin.H{"message": "Unauthorized"})
            c.Abort()
            return
        }

        token, err := VerifyToken(tokenString, env)
        if err != nil {
            c.JSON(401, gin.H{"message": "Invalid token"})
            c.Abort()
            return
        }

        // Token is valid, continue
        c.Set("userEmail", token.Claims.(jwt.MapClaims)["sub"])
        c.Next()
    }
}


// Function to verify JWT tokens
func VerifyToken(tokenString string, env *bootstrap.Env) (*jwt.Token, error) {
	// Parse the token with the secret key
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(env.AccessTokenSecret), nil
	})

	// Check for verification errors
	if err != nil {
		return nil, err
	}

	// Check if the token is valid
	if !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}

	// Return the verified token
	return token, nil
}