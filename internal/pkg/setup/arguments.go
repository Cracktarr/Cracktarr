package setup

import (
	"fmt"
	"log"
	"os"
	"path/filepath"

	"github.com/akamensky/argparse"
)

func argumentsParsing(args []string) *Config {
	var err error
	var config = new(Config)

	parser := argparse.NewParser("Cracktarr", "")

	address := parser.String("a", "address", &argparse.Options{
		Required: false,
		Help:     "Address on which Cracktarr should listen to connections",
		Default:  "0.0.0.0:2342",
	})

	configPathRaw := parser.String("c", "config", &argparse.Options{
		Required: false,
		Help:     "Config path",
		Default:  "./config",
	})

	tmdbAPIKey := parser.String("", "tmdb-key", &argparse.Options{
		Required: true,
		Help:     "TheMovieDB API key",
	})

	// Parse input
	err = parser.Parse(args)
	if err != nil {
		// In case of error print error and print usage
		// This can also be done by passing -h or --help flags
		fmt.Print(parser.Usage(err))
		os.Exit(0)
	}

	// Convert path parameters to absolute paths
	config.ConfigPath, err = filepath.Abs(*configPathRaw)
	if err != nil {
		log.Fatal(err)
	}

	// Finally save the collected flags
	config.Address = *address
	config.TMDBKey = *tmdbAPIKey

	return config
}
