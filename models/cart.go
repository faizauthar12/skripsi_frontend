package models

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Cart struct {
	ID         uint       `json:"id" gorm:"primary_key"`
	UserID     uint       `json:"user_id"`
	CartItems  []CartItem `json:"cart_items"`
	GrandTotal float32    `json:"grand_total"`
}

type CartRequest struct {
	CartItems  []CartItemRequest `json:"cart_items"`
	GrandTotal float32           `json:"grand_total"`
}

type CartsModel struct {
	DB *gorm.DB
}

func (m *CartsModel) Create(c *gin.Context) {
	var cartRequest CartRequest
	var cartItem CartItem
	usersModel := UsersModel{DB: m.DB}

	if err := c.ShouldBindJSON(&cartRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	grandTotal := cartItem.getGrandTotal(cartRequest.CartItems)

	cartItems := cartItem.getCartItem(cartRequest.CartItems)

	user, err := usersModel.getUser(c)
	if err != nil {
		c.String(http.StatusUnauthorized, "Unauthorized")
		return
	}

	cart := Cart{
		UserID:     user.ID,
		CartItems:  cartItems,
		GrandTotal: grandTotal,
	}

	err = m.DB.Create(&cart).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "something went wrong",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cart})
}

func (m *CartsModel) GetAllCart(c *gin.Context) {
	carts := []Cart{}

	err := m.DB.Preload("CartItems.Product").Preload("CartItems").Find(&carts).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Something went wrong",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": carts,
	})
}

func (m *CartsModel) GetCart(c *gin.Context) {
	cart := []Cart{}
	usersModel := UsersModel{DB: m.DB}

	user, err := usersModel.getUser(c)
	if err != nil {
		c.String(http.StatusUnauthorized, "Unauthorized")
		return
	}

	err = m.DB.Preload("CartItems.Product").Preload("CartItems").Where("user_id = ?", user.ID).First(&cart).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"message": "cart not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Something went wrong",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": cart,
	})
}
