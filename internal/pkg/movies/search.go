package movies

import (
	"bytes"
	"encoding/json"
	"errors"
	"net/http"

	tmdb "github.com/cyruzin/golang-tmdb"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

// Search query the TheMovieDB for the terms specified in ?query=,
// for each result it looks up the local database, to specify when
// the movie is already added to Lezarr, and other informations.
func Search(db *gorm.DB, tmdbClient *tmdb.Client) gin.HandlerFunc {
	fn := func(c *gin.Context) {
		var searchResults = new(MovieSearchResults)
		var searchQuery = c.Query("query")

		// Get results for query from TheMovieDB
		tmdbResponseRaw, err := tmdbClient.GetSearchMovies(searchQuery, nil)
		if err != nil {
			c.AbortWithError(http.StatusInternalServerError, err)
		}

		// Convert TheMovieDB's response to a movie.MovieSearchResults struct
		tmdbResponse := new(bytes.Buffer)
		json.NewEncoder(tmdbResponse).Encode(tmdbResponseRaw)

		err = json.Unmarshal(tmdbResponse.Bytes(), searchResults)
		if err != nil {
			c.AbortWithError(http.StatusInternalServerError, err)
		}

		// Match the results with movies in the database,
		// and add the appropriate fields if movies are in the database
		for i, result := range searchResults.Results {
			var resultFromDB Movie

			// Query Lezarr DB for each of the results from TheMovieDB
			result := db.Preload(clause.Associations).Find(&resultFromDB, int(result.ID))
			if result.Error != nil && !errors.Is(result.Error, gorm.ErrRecordNotFound) {
				c.AbortWithError(http.StatusInternalServerError, result.Error)
			}

			// If we can find the ID in the local DB, we fill
			// the appropriate fields in the response
			if result.RowsAffected > 0 {
				searchResults.Results[i] = resultFromDB
			}
		}

		c.JSON(http.StatusOK, searchResults)
	}
	return gin.HandlerFunc(fn)
}
