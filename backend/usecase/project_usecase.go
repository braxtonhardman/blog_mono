package usecase

import ( 
	"blog-backend/domain"
)


type projectUseCase struct { 
	repo domain.ProjectRepository
}

func NewProjectUseCase(repo domain.ProjectRepository) domain.ProjectUseCase { 
	return &projectUseCase{
		repo: repo,
	}
}

func(pu *projectUseCase) CreateProject(project *domain.Project) error { 

	return pu.repo.CreateProject(project)
}

func(pu *projectUseCase) List() ([]*domain.Project, error) { 
	return pu.repo.List()
}