package main

import (
	"backend/middlewares"
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
        productRoutes.GET("/", app.products.GetAll)
        productRoutes.GET("/:productId", app.products.GetById)
    }

	protectedProductRoutes := route.Group("/products")
	{
		protectedProductRoutes.Use(middlewares.JwtAuthMiddleware())
		protectedProductRoutes.POST("/", app.products.Create)
		protectedProductRoutes.PUT("/:productId", app.products.Update)
		protectedProductRoutes.DELETE("/:productId", app.products.Delete)
	}

	userRoutes := route.Group("/user")
	{
		userRoutes.POST("/register", app.users.Register)
		userRoutes.POST("/login", app.users.Login)
	}

	return route
}
