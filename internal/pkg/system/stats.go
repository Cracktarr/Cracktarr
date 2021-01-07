package system

import (
	"encoding/json"
	"net/http"

	"github.com/Lezarr/Lezarr/internal/pkg/movies"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetStats(db *gorm.DB) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var stats = new(Stats)

		// Query all movies from DB
		db.Model(&movies.Movie{}).Count(&stats.TotalMovies)

		// Query all missing movies from database
		db.Model(&movies.Movie{}).Where("lezarr_status = ?", "missing").Count(&stats.MissingMovies)

		// Marshal and return response
		resp, err := json.MarshalIndent(stats, "", "    ")
		if err != nil {
			c.AbortWithError(http.StatusInternalServerError, err)
		}

		c.String(http.StatusOK, string(resp))
	}
	return gin.HandlerFunc(fn)
}
