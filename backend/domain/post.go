package domain

import (
	"time"
)

type Post struct {
	ID          int
	Title       string
	Description string
	ReadTime 	string
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   *time.Time
}

type Block struct { 
	ID int 
	BlockType string
	Content string 
	AssignmentOrder int 
	PostID int
}

type PostReq struct { 
	Post
	Blocks []Block
}

// This is the application layer
type PostRepository interface {
    Create(*Post) (*Post, error)
    List() ([]Post, error)
	GetPost(postTitle string) (*PostReq, error)
	CreateBlock(*Block) error
	CreateBlocks(blocks []Block, postID int) error
	DeleteBlock(id int) error 
}

type PostUseCase interface { 
	Create(*Post)  (*Post, error)
    List() ([]Post, error)
	GetPost(postTitle string) (*PostReq, error)
	CreateBlock(*Block) error
	CreateBlocks(blocks []Block, postID int) error
	DeleteBlock(id int) error 
}
