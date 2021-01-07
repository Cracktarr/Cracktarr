interface Video {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  url: string;
}

interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  lezarr_status: string;
  created_at: string;
  updated_at: string;
  resolution: number;
  language: string;
  genres: Genre[];
  path: string;
  score: number;
  videos: Video[] | null;
  adult: boolean;
  backdrop_path: string;
  budget: number;
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
