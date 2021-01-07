package setup

import (
	"os"

	"database/sql"

	tmdb "github.com/cyruzin/golang-tmdb"
	"github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type Config struct {
	Address    string
	ConfigPath string
	TMDBKey    string
	TMDBClient *tmdb.Client
	Logger     *logrus.Logger

	// DB related
	Database     *gorm.DB
	AddMovieByID *sql.Stmt
	GetMovieByID *sql.Stmt
}

func Init(args []string) *Config {
	config := argumentsParsing(os.Args)

	config.Logger = logrus.New()

	// Init config directory
	os.MkdirAll(config.ConfigPath, os.ModePerm)

	// Init SQL database
	config.initDB()

	// Init TheMovieDB connection
	config.Logger.Println("Initializing TheMovieDB connection")
	err := config.initTMDBConnection()
	if err != nil {
		config.Logger.Fatalln("Unable to initialize TheMovieDB connection, check your API key, error:", err.Error())
	}
	config.Logger.Println("TheMovieDB connection initialized")

	return config
}
