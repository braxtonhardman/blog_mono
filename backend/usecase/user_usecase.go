package usecase

import (
	"blog-backend/domain"
	"golang.org/x/crypto/bcrypt"
	"fmt"
)

type userUseCase struct {
	repo domain.UserRepository
}

func NewUserUseCase(userRepository domain.UserRepository) domain.UserUseCase {
	return &userUseCase{
		repo: userRepository,
	}
}

func (uc *userUseCase) Create(user *domain.User) error {
    // Check if a user already exists
    count, err := uc.repo.CountUsers() // you need to implement this method in your repo
    if err != nil {
        return err
    }

	// Only allow one user to ever exist
    if count > 0 {
        return fmt.Errorf("a user already exists")
    }

	fmt.Println(user.Password)
    // Encrypt the user password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        return err
    }
    user.Password = string(hashedPassword)
    // Create the user
    return uc.repo.Create(user)
}

func (uc *userUseCase) FindUser(email string) (*domain.User, error) {
	return uc.repo.FindUser(email)
}