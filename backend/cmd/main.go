package main

import (
	"blog-backend/api/route"
	"blog-backend/bootstrap"
	"log"
  "time"
  "blog-backend/domain"
	"github.com/gin-gonic/gin"
  "github.com/gin-contrib/cors"
  "blog-backend/api/middleware"
)

func main() {
  
  // Responsible for initializing database conneciton and environment variables
  app := bootstrap.App()

  env := app.Env

  db := app.Db

  // Run migration for Post
	err := db.AutoMigrate(&domain.Post{})
	if err != nil {
		log.Fatal("Error Fialed to migrate database")
	}

  gin := gin.Default()

  // ALlows all orignins in the middlware
  gin.Use(cors.New(cors.Config{
    AllowOrigins:     []string{env.FrontendAddress}, // your frontend origin
    AllowMethods:     []string{"GET", "POST", "OPTIONS"},
    AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
    AllowCredentials: true,
    MaxAge:           12 * time.Hour,
}))

  // Set up global rate limiter for routes 
  gin.Use(middleware.RateLimiter())
  
  route.SetUp(env, db, gin)

  err = gin.Run(env.ServerAddress)

  if(err != nil) { 
    log.Fatal("Erorr: Running Gin server")
  }
}