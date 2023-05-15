package models

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type Product struct {
	ID          uint    `json:"id" gorm:"primary_key"`
	Title       string  `json:"title"`
	Price       float32 `json:"price"`
	Description string  `json:"description"`
	Stock       int     `json:"stock"`
}

type ProductRequest struct {
	Title       string  `json:"title" binding:"required"`
	Price       float32 `json:"price" binding:"required"`
	Description string  `json:"description" binding:"required"`
	Stock       int     `json:"stock" binding:"required"`
}

type ProductsModel struct {
	DB *gorm.DB
}

func (m *ProductsModel) Create(c *gin.Context) {
	var productRequest ProductRequest

	if err := c.ShouldBindJSON(&productRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid Request Body",
		})
		return
	}

	product := Product{
		Title:       productRequest.Title,
		Price:       productRequest.Price,
		Description: productRequest.Description,
		Stock:       productRequest.Stock,
	}

	err := m.DB.Create(&product).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "something went wrong",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": product})
}

func (m *ProductsModel) Delete(c *gin.Context) {
	productId := c.Param("productId")

	parseId, err := strconv.Atoi(productId)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid book id",
		})
		return
	}

	err = m.DB.Delete(&Product{}, parseId).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "something went wrong",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "The product has been deleted succesfully",
	})
}

func (m *ProductsModel) Update(c *gin.Context) {
	productId := c.Param("productId")

	parseId, err := strconv.Atoi(productId)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid book id",
		})
		return
	}

	var productRequest ProductRequest

	if err := c.ShouldBindJSON(&productRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid request body",
		})
		return
	}

	product := Product{
		ID: uint(parseId),
	}

	err = m.DB.Model(&product).Updates(Product{
		Title:       productRequest.Title,
		Price:       productRequest.Price,
		Description: productRequest.Description,
	}).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Something went wrong",
		})
		return
	}

	c.JSON(http.StatusOK, product)
}

func (m *ProductsModel) GetAll(c *gin.Context) {
	products := []Product{}

	err := m.DB.Find(&products).Error

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "something went wrong",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"data": products,
	})
}

func (m *ProductsModel) GetById(c *gin.Context) {
	productId := c.Param("productId")

	parseId, err := strconv.Atoi(productId)

	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid book id",
		})
		return
	}

	product := Product{
		ID: uint(parseId),
	}

	err = m.DB.First(&product).Error

	if err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{
				"message": "product not found",
			})
			return
		}

		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "Something went wrong",
		})
		return
	}

	c.JSON(http.StatusOK, product)
}
