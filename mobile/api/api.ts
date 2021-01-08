import axios from "axios";
import { Movie } from "../models/Movie";
import { SearchMovieResponse } from "../models/response/SearchMovieResponse";
import { Statistics } from "../models/Statistics";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const searchMovies = async (text: string): Promise<Movie[]> => {
  const BASE_URL = await AsyncStorage.getItem("BASE_URL");
  const response = await axios.get<SearchMovieResponse>(
    `${BASE_URL}/api/movies/search`,
    {
      params: { query: text },
    },
  );
  return response.data.results;
};

export const getRecentlyAddedMovies = async (): Promise<Movie[]> => {
  const BASE_URL = await AsyncStorage.getItem("BASE_URL");
  const response = await axios.get<Movie[]>(`${BASE_URL}/api/movies`, {
    params: { limit: 50, sort: "created_at desc" },
  });
  return response.data;
};

export const getMovieDetails = async (id: number): Promise<Movie> => {
  const BASE_URL = await AsyncStorage.getItem("BASE_URL");
  const response = await axios.get<Movie>(`${BASE_URL}/api/movies`, {
    params: { id },
  });
  return response.data;
};

export const getLezarrStatistics = async (): Promise<Statistics> => {
  const BASE_URL = await AsyncStorage.getItem("BASE_URL");
  const response = await axios.get<Statistics>(`${BASE_URL}/api/system/stats`, {
    params: { limit: 50, sort: "created_at desc" },
  });
  return response.data;
};

export const addMovie = async (movie: Movie): Promise<Movie> => {
  const BASE_URL = await AsyncStorage.getItem("BASE_URL");
  const response = await axios.post<Movie>(`${BASE_URL}/api/movies`, movie);
  return response.data;
};
