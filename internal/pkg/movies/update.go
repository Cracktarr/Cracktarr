package movies

import (
	"bytes"
	"encoding/json"

	tmdb "github.com/cyruzin/golang-tmdb"
	"gorm.io/gorm"
)

// UpdateMovieMetadata update the metadata of a movie in the database
// by looking it up in TheMovieDB
func (m *Movie) UpdateMovieMetadata(db *gorm.DB, c *tmdb.Client) error {
	movieFromTMDBRaw, err := c.GetMovieDetails(int(m.ID), nil)
	if err != nil {
		return err
	}

	movieFromTMDB := new(bytes.Buffer)
	json.NewEncoder(movieFromTMDB).Encode(movieFromTMDBRaw)

	err = json.Unmarshal(movieFromTMDB.Bytes(), m)
	if err != nil {
		return err
	}

	// Query video informations for the movie (such as trailers)
	err = m.GetMovieVideos(c)
	if err != nil {
		return err
	}

	db.Save(&m)

	return nil
}
