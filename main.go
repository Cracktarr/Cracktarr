package main

import (
	"os"

	"github.com/Lezarr/Lezarr/internal/pkg/router"
	"github.com/Lezarr/Lezarr/internal/pkg/setup"

	_ "github.com/swaggo/gin-swagger/example/basic/docs"
)

// @title Lezarr
// @version 1.0
// @description
// @termsOfService

// @contact.name API Support
// @contact.url https://github.com/Lezarr/Lezarr
// @contact.email corentin.barreau24@gmail.com

// @license.name GNU General Public License v3.0
// @license.url https://github.com/Lezarr/Lezarr/blob/main/LICENSE

// @BasePath /api
func main() {
	config := setup.Init(os.Args)

	config.Logger.Fatalln(router.Init(config).Run(config.Address))
}
