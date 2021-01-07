package router

import (
	"net/http"

	"github.com/Lezarr/Lezarr/internal/pkg/movies"
	"github.com/Lezarr/Lezarr/internal/pkg/setup"
	"github.com/Lezarr/Lezarr/internal/pkg/system"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	ginSwagger "github.com/swaggo/gin-swagger"
	"github.com/swaggo/gin-swagger/swaggerFiles"
)

// Init initialise the router and the routes, and return it
func Init(config *setup.Config) *gin.Engine {
	gin.SetMode(gin.ReleaseMode)

	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello world!")
	})

	url := ginSwagger.URL("http://localhost:2343/swagger/doc.json")
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler, url))

	router.GET("/api/movies/search", movies.Search(config.Database, config.TMDBClient))
	router.POST("/api/movies/add", movies.Add(config.Database, config.TMDBClient))
	router.GET("/api/movies/get", movies.Get(config.Database, config.TMDBClient))

	router.GET("/api/system/stats", system.GetStats(config.Database))

	return router
}
