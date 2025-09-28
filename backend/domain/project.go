package domain


type Project struct { 
	ID int 
	Title string 
	Description string 
	Image string
	Repository string
	Site string
	Status string
}

type ProjectRepository interface { 
	CreateProject(*Project) error 
	List() ([]*Project, error) 
}

type ProjectUseCase interface { 
	CreateProject(*Project) error 
	List() ([]*Project, error) 
}