import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  Image,
  ImageBackground,
  InteractionManager,
  LayoutAnimation,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { MovieDetailsScreenRouteProp } from "../types";
import moment from "moment";
import { getFormattedRuntime } from "../utils/Formatting";
import { BadgeList } from "../components/Badge";
import DetailsTabs from "../components/DetailsTabs";
import MovieInfoView from "../components/MovieInfoView";
import { MaterialIcons } from "@expo/vector-icons";
import SearchResults, { Result } from "../components/SearchResults";
import { getMovieDetails } from "../api/api";

const resultsDebug: Result[] = [
  {
    title: "Back.To.The.Future.1985.MULTi.2160p.REMUX.DoVi-PEPiTE.mkv",
    indexer: "YGGTorrent",
    size: 56.2,
    peers: 15,
    leechers: 0,
  },
  {
    title: "Back.To.The.Future.1985.MULTi.1080p.REMUX-PEPiTE.mkv",
    indexer: "YGGTorrent",
    size: 26.2,
    peers: 45,
    leechers: 0,
  },
];

type Props = {
  route: MovieDetailsScreenRouteProp;
};

export default function MovieDetails({ route }: Props): JSX.Element | null {
  const { movie } = route.params;

  const [currentTab, setCurrentTab] = useState(0);
  const [movieDetails, setMovieDetails] = useState(movie);

  const {
    poster_path,
    backdrop_path,
    title,
    videos,
    release_date,
    runtime,
    lezarr_status,
    language,
    resolution,
    genres,
    id,
  } = movieDetails;

  useEffect(() => {
    async function getDetails() {
      try {
        const details = await getMovieDetails(id);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMovieDetails(details);
      } catch (e) {
        alert(e);
      }
    }
    InteractionManager.runAfterInteractions(() => getDetails());
  }, []);

  const renderHeader = () => {
    return (
      <View>
        <ImageBackground
          style={styles.headerImage}
          resizeMode="cover"
          source={{
            uri: !movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original/${poster_path}`
              : `https://image.tmdb.org/t/p/original/${backdrop_path}`,
          }}
        >
          <LinearGradient
            colors={["rgba(19,33,45,0.8)", "transparent"]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.2 }}
            style={[StyleSheet.absoluteFill]}
          />
        </ImageBackground>

        <View>
          <Image
            style={styles.headerImageReverse}
            source={{
              uri: !movie.backdrop_path
                ? `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`
                : `https://image.tmdb.org/t/p/original/${backdrop_path}`,
            }}
          />
          <BlurView
            tint="dark"
            intensity={100}
            style={[StyleSheet.absoluteFill, styles.header]}
          >
            <LinearGradient
              colors={[
                Platform.OS === "android"
                  ? Colors.dark.background
                  : "transparent",
                Colors.dark.background,
              ]}
              style={[StyleSheet.absoluteFill]}
            />
            <Text style={styles.movieTitle}>{title}</Text>
            <TouchableOpacity style={styles.downloadButton}>
              <MaterialIcons name={"search"} size={18} color={"black"} />
              <Text style={styles.downloadText}>AUTO SEARCH</Text>
            </TouchableOpacity>
            <Text style={styles.desc}>
              {release_date ? moment(release_date).year() : "N/A"} •{" "}
              {getFormattedRuntime(runtime)} •{" "}
              {genres && genres.length > 0
                ? genres
                    .map((g) => g.name)
                    .splice(0, 4)
                    .join(", ")
                : "N/A"}
            </Text>
            <BadgeList
              status={lezarr_status}
              resolution={resolution}
              language={language}
            />
            <DetailsTabs
              tabs={[
                {
                  title: "details",
                  component: <MovieInfoView movie={movieDetails} />,
                },
                {
                  title: "search",
                  component: <SearchResults results={resultsDebug} />,
                },
                { title: "history", component: <View /> },
              ]}
              currentTab={currentTab}
              handleTabChange={(i) => {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut,
                );
                setCurrentTab(i);
              }}
            />
          </BlurView>
        </View>
      </View>
    );
  };

  return <ScrollView style={styles.container}>{renderHeader()}</ScrollView>;
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  headerImage: {
    height: "280@ms0.2",
  },
  headerImageReverse: {
    height: "280@ms0.2",
    transform: [{ rotateX: "180deg" }],
  },
  header: {
    padding: 20,
    backgroundColor: Colors.dark.background,
  },
  movieTitle: {
    fontSize: "24@ms0.1",
    fontWeight: "600",
    marginBottom: "10@ms0.2",
  },
  downloadButton: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 10,
    alignSelf: "baseline",
    borderRadius: 4,
    marginBottom: "10@ms0.2",
  },
  downloadText: {
    color: Colors.dark.secondary,
    fontWeight: "bold",
    fontSize: 13,
    marginLeft: 4,
  },
  desc: {
    fontSize: "10@ms0.2",
    fontWeight: "600",
    marginBottom: "10@ms0.2",
  },
});
