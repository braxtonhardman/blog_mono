package main

import (
	"blog-backend/api/route"
	"blog-backend/bootstrap"
	"log"
  "blog-backend/domain"
	"github.com/gin-gonic/gin"
  "github.com/gin-contrib/cors"
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
  gin.Use(cors.Default())
  
  route.SetUp(env, db, gin)

  err = gin.Run(env.ServerAddress)

  if(err != nil) { 
    log.Fatal("Erorr: Running Gin server")
  }
}