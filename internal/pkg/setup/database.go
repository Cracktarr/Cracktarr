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
	c.Database, err = gorm.Open(sqlite.Open(filepath.Join(c.ConfigPath, "lezarr.db")), nil)
	if err != nil {
		c.Logger.Fatalln("failed to open local database, error:", err.Error())
	}

	// Initialise the table if it doesn't exist
	err = c.Database.AutoMigrate(&movies.Movie{})
	if err != nil {
		c.Logger.Fatalln("failed to initialise tables, error:", err.Error())
	}
}
