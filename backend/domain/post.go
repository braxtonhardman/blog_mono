package domain

import (
	"time"
)

type Post struct {
	ID          uint
	Title       string
	Description string
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   *time.Time
}

// This is the application layer
type PostRepository interface {
    Create(*Post) error
    List() ([]Post, error)

}

type PostUseCase interface { 
	Create(*Post) error
    List() ([]Post, error)
}
