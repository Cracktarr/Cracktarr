package movies

import (
	"time"

	"gorm.io/gorm"
)

// MovieSearchResults represent the search results returned by a search request
type MovieSearchResults struct {
	Page         int64   `json:"page"`
	TotalResults int64   `json:"total_results"`
	TotalPages   int64   `json:"total_pages"`
	Results      []Movie `json:"results"`
}

// Video represent a TMDB video
type Video struct {
	gorm.Model `json:"-"`
	Iso639_1   string `json:"iso_639_1"`
	Iso3166_1  string `json:"iso_3166_1"`
	ID         string `json:"key"`
	Name       string `json:"name"`
	Site       string `json:"site"`
	Size       int    `json:"size"`
	Type       string `json:"type"`
	URL        string `json:"url"`
}

// Genre represent a TMDB genre
type Genre struct {
	gorm.Model `json:"-"`
	ID         uint   `json:"id"`
	Name       string `json:"name"`
}

// Movie represent a movie in Lezarr's database
type Movie struct {
	// Lezarr fields
	LezarrStatus string    `json:"lezarr_status"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
	Resolution   int       `json:"resolution"`
	Language     string    `json:"language"`
	Path         string    `json:"path"`
	Score        int       `json:"score"`

	// Metadata
	Videos []Video `json:"videos" gorm:"many2many:movie_video;"`
	Genres []Genre `json:"genres" gorm:"many2many:movie_genre;"`

	Adult            bool    `json:"adult"`
	BackdropPath     string  `json:"backdrop_path"`
	Budget           int64   `json:"budget"`
	Homepage         string  `json:"homepage"`
	ID               int64   `json:"id"`
	IMDbID           string  `json:"imdb_id"`
	OriginalLanguage string  `json:"original_language"`
	OriginalTitle    string  `json:"original_title"`
	Overview         string  `json:"overview"`
	Popularity       float32 `json:"popularity"`
	PosterPath       string  `json:"poster_path"`
	ReleaseDate      string  `json:"release_date"`
	Revenue          int64   `json:"revenue"`
	Runtime          int     `json:"runtime"`
	Status           string  `json:"status"`
	Tagline          string  `json:"tagline"`
	Title            string  `json:"title"`
	Video            bool    `json:"video"`
	VoteAverage      float32 `json:"vote_average"`
	VoteCount        int64   `json:"vote_count"`
}
