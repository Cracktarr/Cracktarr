package movies

import (
	"bytes"
	"encoding/json"
	"net/http"

	tmdb "github.com/cyruzin/golang-tmdb"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Add add a new movie to Lezarr
func Add(db *gorm.DB, tmdbClient *tmdb.Client) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var movie = new(Movie)

		err := c.BindJSON(&movie)
		if err != nil || movie.ID == 0 {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err})
			return
		}

		// If the ID is already in the DB, we just update the movie details
		result := db.Find(&movie, movie.ID)
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

			c.JSON(http.StatusOK, gin.H{"message": "movie already added", "id": movie.ID})
			return
		}

		// Query movie details from TheMovieDB
		movieFromTMDBRaw, err := tmdbClient.GetMovieDetails(int(movie.ID), nil)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		// Convert TheMovieDB's response to a movie.Movie struct
		movieFromTMDB := new(bytes.Buffer)
		json.NewEncoder(movieFromTMDB).Encode(movieFromTMDBRaw)

		err = json.Unmarshal(movieFromTMDB.Bytes(), movie)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		// Query video informations for the movie (such as trailers)
		err = movie.GetMovieVideos(tmdbClient)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err})
			return
		}

		// Set default values for some fields
		movie.LezarrStatus = "missing"

		// Add the movie to the database
		result = db.Create(&movie)
		if result.Error != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": result.Error})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "added", "id": movie.ID})
	}

	return gin.HandlerFunc(fn)
}
