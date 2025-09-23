package repository

import (
	"blog-backend/domain"
	"gorm.io/gorm"
	"strings"
	"golang.org/x/crypto/bcrypt"
)

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) domain.UserRepository {
	return &userRepository{db: db}
}


func (ur *userRepository) Create(user *domain.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	} 
	return ur.db.Create(&domain.User{
		Email: strings.ToLower(user.Email),
		Password: string(hashedPassword),
	}).Error
}

func (ur *userRepository) FindUser(email string) (*domain.User, error) {
	var user domain.User
	results := ur.db.Where("email = ?", strings.ToLower(email)).First(&user)
	if results.Error != nil {
		return nil, results.Error
	}
	return &user, nil
}

