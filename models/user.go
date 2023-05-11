package models

import (
	token "backend/utils/token"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	ID       uint   `json:"id" gorm:"not null;uniqueIndex;primary_key"`
	Username string `json:"username" gorm:"uniqueIndex"`
	Password string `gorm:"not null"`
}

type UserRequest struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

type UsersModel struct {
	DB *gorm.DB
}

// TODO: placed at controller
func (m *UsersModel) Register(c *gin.Context) {
	var userRequest UserRequest

	if err := c.ShouldBindJSON(&userRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Request Body",
		})
		return
	}

	// hashsing the password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(userRequest.Password), bcrypt.DefaultCost)

	if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{
            "message":"something went wrong",
        })
	}

	trimedUsername := strings.TrimSpace(userRequest.Username)

	user := User{
		Username: trimedUsername,
		Password: string(hashedPassword),
	}

	err = m.DB.Create(&user).Error

	// TODO: Handle error if there is existing users
	// UNIQUE constraint failed: users.username
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "something went wrong",
			})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Registration success"})
}

func VerifyPassword(password,hashedPassword string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

// TODO: placed at controller
func (m *UsersModel) Login(c *gin.Context) {
    var userRequest UserRequest
    var user User

    if err := c.ShouldBindJSON(&userRequest); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{
            "message": "Invalid Request Body",
        })
        return
    }
    // check gorm and sqlite function
    err := m.DB.Model(User{}).Where("username = ?", userRequest.Username).Take(&user).Error
	
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "something went wrong",
			})
		return
	}
	
	err = VerifyPassword(userRequest.Password, user.Password)
	
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword{
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "something went wrong",
			})
		return
	}
	
	tkn, err := token.GenerateToken(user.ID)
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "username or password is incorrect",
			})
		return
	}
	
	c.JSON(http.StatusOK, gin.H{"token": tkn})
}



// TODO: Should be placed in Controller.
func (m* UsersModel)CurrentUser(c *gin.Context) {
	user_id, err := token.ExtractTokenID(c)
	
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Request Body",
		})
	}
	
	var user User
	if err := m.DB.First(&user, user_id).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "User not found",
			})
		return
	}
	
	user.Password = ""
	
	c.JSON(http.StatusOK, gin.H{"message": "success", "data": user})
}