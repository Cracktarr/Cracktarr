import axios from "axios";
import { Movie } from "../models/Movie";
import { SearchMovieResponse } from "../models/response/SearchMovieResponse";
import { Statistics } from "../models/Statistics";
import { BASE_URL } from "@env";

export const searchMovies = (text: string): Promise<Movie[]> => {
  return new Promise<Movie[]>((resolve, reject) => {
    axios
      .get<SearchMovieResponse>(`${BASE_URL}/movies/search`, {
        params: { query: text },
      })
      .then((res) => resolve(res.data.results))
      .catch((err) => reject(err));
  });
};

export const getRecentlyAddedMovies = (): Promise<Movie[]> => {
  return new Promise<Movie[]>((resolve, reject) => {
    axios
      .get<Movie[]>(`${BASE_URL}/movies/get`, {
        params: { limit: 50, sort: "created_at desc" },
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const getLezarrStatistics = (): Promise<Statistics> => {
  return new Promise<Statistics>((resolve, reject) => {
    axios
      .get<Statistics>(`${BASE_URL}/system/stats`)
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};

export const addMovie = (id: number): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    axios
      .get<string>(`${BASE_URL}/movies/add`, { params: { id: id } })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
