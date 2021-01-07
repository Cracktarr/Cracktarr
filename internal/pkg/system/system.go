package system

// Stats holds statistics about a Lezarr instance,
// such as the number of added movies, or missing movies.
type Stats struct {
	TotalMovies   int64 `json:"total_movies"`
	MissingMovies int64 `json:"missing_movies"`
}
