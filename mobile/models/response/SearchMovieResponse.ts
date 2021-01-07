import { Movie } from "../Movie";

export interface SearchMovieResponse {
  page?: number;
  total_result?: number;
  total_pages?: number;
  results: Movie[];
}
