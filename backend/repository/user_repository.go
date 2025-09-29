package repository

import (
	"blog-backend/domain"
	"gorm.io/gorm"
	"strings"
)

type userRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) domain.UserRepository {
	return &userRepository{db: db}
}


func (ur *userRepository) Create(user *domain.User) error {
	return ur.db.Create(user).Error
}

func (ur *userRepository) FindUser(email string) (*domain.User, error) {
	var user domain.User
	results := ur.db.Where("email = ?", strings.ToLower(email)).First(&user)
	if results.Error != nil {
		return nil, results.Error
	}
	return &user, nil
}

func (ur *userRepository) CountUsers() (int, error) {
    var count int64
    if err := ur.db.Model(&domain.User{}).Count(&count).Error; err != nil {
        return 0, err
    }
    return int(count), nil
}

