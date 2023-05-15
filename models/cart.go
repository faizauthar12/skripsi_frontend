package models

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Cart struct {
	ID         uint       `json:"id" gorm:"primary_key"`
	CartItems  []CartItem `json:"cart_items"`
	GrandTotal float32    `json:"grand_total"`
}

type CartRequest struct {
	CartItems  []CartItem `json:"cart_items"`
	GrandTotal float32    `json:"grand_total"`
}

type CartsModel struct {
	DB *gorm.DB
}

func (m *CartsModel) Create(c *gin.Context) {
	var cartRequest CartRequest
	var cartItem CartItem

	if err := c.ShouldBindJSON(&cartRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	grandTotal := cartItem.getGrandTotal(cartRequest.CartItems)
	
	cart := Cart{
		CartItems:  cartRequest.CartItems,
		GrandTotal: grandTotal,
	}

	err := m.DB.Create(&cart).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "something went wrong",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": cart})
}
