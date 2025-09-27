package postgres

import (
	"fmt"
	"log"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"blog-backend/domain"
)

func InitUserTable(db *gorm.DB) {
	err := db.AutoMigrate(&domain.User{})
	if err != nil {
		log.Fatal("Error migrating user table")
	}
}

func InitPostTable(db *gorm.DB) {
	err := db.AutoMigrate(&domain.Post{})
	if err != nil {
		log.Fatal("Error migrating post table")
	}
}

func InitBlocksTable(db *gorm.DB) { 
	err := db.AutoMigrate(&domain.Block{})
	if(err != nil) { 
		log.Fatal("Erorr migrating block table")
	}
}

func InitProjecTable(db *gorm.DB) { 
	err := db.AutoMigrate(&domain.Project{})
	if(err != nil) { 
		log.Fatal("Erorr migrating block table")
	}
}

func InitTables(db *gorm.DB) {
	InitUserTable(db)
	InitPostTable(db)
	InitBlocksTable(db)
}

func Open(host, user, pass, name string, port string) (*gorm.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=UTC",
		host, user, pass, name, port,
	)
	fmt.Println(dsn)
	return gorm.Open(postgres.Open(dsn), &gorm.Config{})
}

func Close(db *gorm.DB) error {
	sqlDB, err := db.DB()
	if err != nil {
		return err
	}
	return sqlDB.Close()
}
