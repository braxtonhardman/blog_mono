package repository 

import ( 
	"blog-backend/domain"
	"gorm.io/gorm"
)

type projectRepository struct {db *gorm.DB}

func NewProjectRepository(db *gorm.DB) domain.ProjectRepository { 
	return &projectRepository{db: db} 
}

func(p *projectRepository) CreateProject(project *domain.Project) error { 

	return p.db.Create(project).Error
}

func(p *projectRepository) List() ([]*domain.Project, error) { 
	var project []*domain.Project
	result := p.db.Find(&project)
	
	if(result.Error != nil) { 
		return nil, result.Error
	}

	return project, nil
}