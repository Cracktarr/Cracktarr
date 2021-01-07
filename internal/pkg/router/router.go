package router

import (
	"net/http"

	"github.com/Lezarr/Lezarr/internal/pkg/setup"

	"github.com/Lezarr/Lezarr/internal/pkg/movies"

	"github.com/Lezarr/Lezarr/internal/pkg/system"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
)

// Init initialise the router and the routes, and return it
func Init(config *setup.Config) *gin.Engine {
	gin.SetMode(gin.ReleaseMode)

	router := gin.Default()
	router.Use(gzip.Gzip(gzip.DefaultCompression))

	router.GET("/", func(c *gin.Context) {
		c.String(http.StatusOK, "Hello world!")
	})

	api := router.Group("/api")
	{
		moviesAPI := api.Group("/movies")
		{
			moviesAPI.GET("/search", movies.Search(config.Database, config.TMDBClient))
			moviesAPI.POST("/add", movies.Add(config.Database, config.TMDBClient))
			moviesAPI.GET("/get", movies.Get(config.Database, config.TMDBClient))
		}

		systemAPI := api.Group("/system")
		{
			systemAPI.GET("/stats", system.GetStats(config.Database))
		}
	}

	return router
}
