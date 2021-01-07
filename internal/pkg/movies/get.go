package movies

import (
	"net/http"
	"strconv"

	tmdb "github.com/cyruzin/golang-tmdb"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// Get return the movie matched with ?id= in the DB if it exists, else
// it returns a 404. If no ID is specified, Get return all the movies
// in the database.
func Get(db *gorm.DB, tmdbClient *tmdb.Client) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var rawID = c.Query("id")

		// If an id is specified, we look for it in the database,
		// else, we return the whole list of movies.
		if len(rawID) > 0 {
			var movie Movie

			ID, err := strconv.Atoi(rawID)
			if err != nil {
				c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err})
				return
			}

			// Query the ID from the database
			result := db.Preload(clause.Associations).Find(&movie, ID)
			if result.Error != nil {
				c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
				return
			}

			// If we get a result, we update the data with a request to TheMovieDB
			if result.RowsAffected > 0 {
				err = movie.UpdateMovieMetadata(db, tmdbClient)
				if err != nil {
					c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
					return
				}

				c.JSON(http.StatusOK, movie)
			} else {
				c.JSON(http.StatusNotFound, gin.H{
					"error": "movie not found",
				})
			}
		} else {
			var err error
			var limit int
			var offset int
			var movies []Movie
			var limitQuery = c.Query("limit")
			var offsetQuery = c.Query("offset")
			var sortQuery = c.Query("sort")

			if len(limitQuery) > 0 {
				limit, err = strconv.Atoi(limitQuery)
				if err != nil {
					c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err})
					return
				}
				_ = limit
			} else {
				limit = -1
			}

			if len(offsetQuery) > 0 {
				offset, err = strconv.Atoi(offsetQuery)
				if err != nil {
					c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err})
					return
				}
				_ = offset
			} else {
				offset = -1
			}

			if len(sortQuery) > 0 {
				result := db.Preload(clause.Associations).Order(sortQuery).Offset(offset).Limit(limit).Find(&movies)
				if result.Error != nil {
					c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
					return
				}
			} else {
				result := db.Preload(clause.Associations).Offset(offset).Limit(limit).Find(&movies)
				if result.Error != nil {
					c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
					return
				}
			}

			c.JSON(http.StatusOK, movies)
		}
	}
	return gin.HandlerFunc(fn)
}
