package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (app *application) routes() *gin.Engine {
	route := gin.Default()

	route.GET("/", func(ctx *gin.Context) {
		ctx.JSON(http.StatusOK, gin.H{
			"data": "Hello World",
		})
	})

    productRoutes := route.Group("/products")
    {
        productRoutes.POST("/", app.products.Create)
        productRoutes.GET("/", app.products.GetAll)
        productRoutes.GET("/:productId", app.products.GetById)
        productRoutes.PUT("/:productId", app.products.Update)
        productRoutes.DELETE("/:productId", app.products.Delete)
    }

	return route
}
