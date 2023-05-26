package models

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type CartItem struct {
	ID        string  `json:"id" gorm:"primary_key"`
	CartID    uint    `gorm:"index"`
	Product   Product `json:"product"`
	ProductID uint    `gorm:"index"`
	Qty       int     `json:"qty"`
}

type CartItemRequest struct {
	Product Product `json:"product"`
	Qty     int     `json:"qty"`
}

func (m *CartItem) getGrandTotal(cartItemRequest []CartItemRequest) (total float32) {
	for _, cartItem := range cartItemRequest {
		total += (cartItem.Product.Price * float32(cartItem.Qty))
	}
	return total
}

func (m *CartItem) getCartItem(cartItemRequest []CartItemRequest) (cartItem []CartItem) {
	cartItem = make([]CartItem, len(cartItemRequest))
	for i, v := range cartItemRequest {
		cartItem[i] = CartItem{
			Product: v.Product,
			Qty:     v.Qty,
		}
	}
	return cartItem
}

func (m *CartItem) BeforeCreate(tx *gorm.DB) error {
	if m.ID == "" {
		m.ID = uuid.New().String()
	}
	return nil
}
