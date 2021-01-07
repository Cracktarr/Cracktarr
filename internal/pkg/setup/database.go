package setup

import (
	"path/filepath"

	"github.com/Lezarr/Lezarr/internal/pkg/movies"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

func (c *Config) initDB() {
	var err error

	// Open the database
	c.Database, err = gorm.Open(sqlite.Open(filepath.Join(c.ConfigPath, "lezarr.db")), &gorm.Config{})
	if err != nil {
		c.Logger.Fatalln("failed to open local database, error:", err.Error())
	}

	// Initialise the table if it doesn't exist
	err = c.Database.Table("movies").AutoMigrate(&movies.Movie{})
	if err != nil {
		c.Logger.Fatalln("failed to initialise table movies, error:", err.Error())
	}

	err = c.Database.AutoMigrate(&movies.MovieVideos{})
	if err != nil {
		c.Logger.Fatalln("failed to initialise table movie_videos, error:", err.Error())
	}

	err = c.Database.AutoMigrate(&movies.MovieGenres{})
	if err != nil {
		c.Logger.Fatalln("failed to initialise table movie_genres, error:", err.Error())
	}
}
