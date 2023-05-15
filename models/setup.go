package models

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func OpenDB() (*gorm.DB, error) {
	db, err := gorm.Open(sqlite.Open("dev.db"), &gorm.Config{})

	if err != nil {
		return nil, err
	}

	err = db.AutoMigrate(&Product{}, &User{}, &Cart{})

	if err != nil {
		return nil, err
	}

	return db, nil
}
