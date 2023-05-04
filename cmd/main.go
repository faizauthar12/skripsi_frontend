package main

import "backend/models"

const PORT = ":8080"

type application struct {
    products *models.ProductsModel
}

func main() {
    db, err := models.OpenDB()

    if err != nil {
        panic(err.Error())
    }

    app := &application{
        products: &models.ProductsModel{DB: db},
    }

	route := app.routes()
	route.Run(PORT)
}
