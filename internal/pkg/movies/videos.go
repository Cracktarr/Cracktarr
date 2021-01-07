package movies

import tmdb "github.com/cyruzin/golang-tmdb"

func generateVideoURL(key, site string) string {
	if site == "YouTube" {
		return "https://www.youtube.com/watch?v=" + key
	} else if site == "Vimeo" {
		return "https://vimeo.com/" + key
	}
	return ""
}

// GetMovieVideos query the videos for a movie
func (m *Movie) GetMovieVideos(c *tmdb.Client) error {
	videosFromTMDB, err := c.GetMovieVideos(int(m.ID), nil)
	if err != nil {
		return err
	}

	m.Videos = nil
	for _, video := range videosFromTMDB.Results {
		var newVideo MovieVideos

		newVideo.Iso639_1 = video.Iso639_1
		newVideo.Iso3166_1 = video.Iso3166_1
		newVideo.ID = video.Key
		newVideo.Name = video.Name
		newVideo.Site = video.Site
		newVideo.Size = video.Size
		newVideo.Type = video.Type

		newVideo.URL = generateVideoURL(video.Key, video.Site)

		m.Videos = append(m.Videos, newVideo)
	}

	return nil
}
