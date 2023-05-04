package main

const PORT = ":8080"

type application struct {
}

func main() {
    app := &application{}

    route := app.routes()
    route.Run(PORT)
}
