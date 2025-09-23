package usecase

import (
	"blog-backend/domain"
	"golang.org/x/crypto/bcrypt"
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

	// Encrypt the user password and create a user strct 
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)

	return uc.repo.Create(user)
}

func (uc *userUseCase) FindUser(email string) (*domain.User, error) {
	return uc.repo.FindUser(email)
}