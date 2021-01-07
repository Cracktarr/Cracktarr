package setup

import (
	"net/http"
	"time"

	tmdb "github.com/cyruzin/golang-tmdb"
)

func (c *Config) initTMDBConnection() (err error) {
	tmdbClient, err := tmdb.Init(c.TMDBKey)
	if err != nil {
		return err
	}

	customClient := http.Client{
		Timeout: time.Second * 5,
		Transport: &http.Transport{
			MaxIdleConns:    10,
			IdleConnTimeout: 15 * time.Second,
		},
	}

	tmdbClient.SetClientConfig(customClient)
	tmdbClient.SetClientAutoRetry()

	c.TMDBClient = tmdbClient

	return nil
}
