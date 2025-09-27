package repository

import (
	"blog-backend/domain"
	"gorm.io/gorm"
)

// Wrapper that is a simple struct passed between barriers that reflects the functionality of the database
type postRepository struct{ db *gorm.DB }

// returns a pointer to a PostRepositroy struct that wraps a gorm.DB instnance which in itself is another 
// struct 
func NewPostRepository(db *gorm.DB) domain.PostRepository { 
	return &postRepository{db: db} 
}

func (p *postRepository) Create(t *domain.Post) (*domain.Post, error) {
    result := p.db.Create(t)  // result is *gorm.DB
    if result.Error != nil {   // check the Error field
        return nil, result.Error
    }
    return t, nil
}

func (p *postRepository) List() ([]domain.Post, error) {
    var posts []domain.Post
	results := p.db.Find(&posts)

	if results.Error != nil {
		return nil, results.Error
	}

	return posts, nil
}

func(p *postRepository) GetPost(postTitle string) (*domain.PostReq, error) { 
	// Grab post information
	var post domain.Post
	var blocks []domain.Block

	results := p.db.Where("title = ?", postTitle).First(&post)

	if(results.Error != nil) { 
		return nil, results.Error
	}

	// Grab Block Information 
	results = p.db.Where("post_id = ?", post.ID).Find(&blocks)
	if(results.Error != nil) { 
		return nil, results.Error
	}
	
	return &domain.PostReq{
		Post: post,
		Blocks: blocks,
	}, nil
}

func(p *postRepository) CreateBlock(block *domain.Block) error { 
	return p.db.Create(block).Error
}

func(p *postRepository) CreateBlocks(blocks []domain.Block, postID int) error { 
	err := p.db.Transaction(func(tx *gorm.DB) error {
	
		// Insert blocks sequentially
		for index, value := range blocks {
			block := domain.Block{
				ID:              value.ID,
				BlockType:       value.BlockType,
				Content:         value.Content,
				AssignmentOrder: index,
				PostID:          postID,
			}
			
			if err := tx.Create(&block).Error; err != nil {
				return err
			}
		}
	
		return nil
	})
	return err
}

func(p *postRepository) DeleteBlock(id int) error { 
	var block domain.Block
	results := p.db.Where("ID = ?", id).First(&block)
	if(results.Error != nil) { 
		return results.Error
	}
	return nil
}