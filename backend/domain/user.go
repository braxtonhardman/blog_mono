package domain 

import ( 
	"time"
)

type User struct { 
	ID        uint   `gorm:"primaryKey"`
	Email     string `gorm:"unique"`
	Password  string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type UserRepository interface { 
	Create(user *User) error
	FindUser(email string) (*User, error)
	CountUsers() (int, error)
	// Login(email string, password string) (*User, error)
}

type UserUseCase interface { 
	Create(user *User) error
	FindUser(email string) (*User, error)
	// Login(email string, password string) (*User, error)
}