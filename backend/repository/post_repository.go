package repository


import (
    "gorm.io/gorm"
    "blog-backend/domain"
)

// Wrapper that is a simple struct passed between barriers that reflects the functionality of the database
type postRepository struct{ db *gorm.DB }

// returns a pointer to a PostRepositroy struct that wraps a gorm.DB instnance which in itself is another 
// struct 
func NewPostRepository(db *gorm.DB) domain.PostRepository { 
	return &postRepository{db: db} 
}

func (p *postRepository) Create(t *domain.Post) error {
    return p.db.Create(t).Error
}

func (p *postRepository) List() ([]domain.Post, error) {
    var posts []domain.Post
	results := p.db.Find(&posts)

	if results.Error != nil {
		return nil, results.Error
	}

	return posts, nil
}

func(p *postRepository) GetPost(postTitle string) (*domain.Post, error) { 
	var post domain.Post
	results := p.db.Where("title = ?", postTitle).First(&post)

	if(results.Error != nil) { 
		return nil, results.Error
	}
	
	return &post, nil
}

