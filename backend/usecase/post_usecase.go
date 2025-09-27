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

func (pc *postUseCase) Create(post *domain.Post) (*domain.Post, error) {
	// Business logic validation
	if post.Title == "" {
		return nil, errors.New("title is required")
	}

	if post.Description == "" {
		return nil, errors.New("description is required")
	}

	// Error Checking for duplicate posts 

	// Call repository to create post
	return pc.repo.Create(post)
}

func (pc *postUseCase) List() ([]domain.Post, error) {
	// Business logic: if no postName provided, get all posts
	// If postName provided, filter by title
	return pc.repo.List()
}

func (pc *postUseCase) GetPost(postTitle string) (*domain.PostReq, error) { 
	return pc.repo.GetPost(postTitle)
}

func (pc *postUseCase) CreateBlock(block *domain.Block) error { 
	return pc.repo.CreateBlock(block);
}

func (pc *postUseCase) CreateBlocks(blocks []domain.Block, postID int) error { 
	return pc.repo.CreateBlocks(blocks, postID);
}

func (pc *postUseCase) DeleteBlock(id int) error { 
	return pc.repo.DeleteBlock(id);
}
