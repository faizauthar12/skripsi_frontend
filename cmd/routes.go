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

	return route
}
