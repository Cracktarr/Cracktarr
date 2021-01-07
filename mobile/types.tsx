import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Movie } from "./models/Movie";

export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
  MovieDetails: { movie: Movie };
};

export type BottomTabParamList = {
  HomeScreen: undefined;
  SearchScreen: undefined;
  ActivityScreen: undefined;
  SettingsScreen: undefined;
};

export type MovieDetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "MovieDetails"
>;

export type MovieDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MovieDetails"
>;
