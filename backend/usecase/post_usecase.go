package usecase

import (
	"blog-backend/domain"
	"errors"
)

type postUseCase struct {
	repo domain.PostRepository
}

func NewPostUseCase(postRepository domain.PostRepository) domain.PostUseCase {
	return &postUseCase{
		repo: postRepository,
	}
}

func (pc *postUseCase) Create(post *domain.Post) error {
	// Business logic validation
	if post.Title == "" {
		return errors.New("title is required")
	}

	if post.Description == "" {
		return errors.New("description is required")
	}

	// Call repository to create post
	return pc.repo.Create(post)
}

func (pc *postUseCase) List() ([]domain.Post, error) {
	// Business logic: if no postName provided, get all posts
	// If postName provided, filter by title
	return pc.repo.List()
}

func (pc *postUseCase) GetPost(postTitle string) (*domain.Post, error) { 
	return pc.repo.GetPost(postTitle)
}
