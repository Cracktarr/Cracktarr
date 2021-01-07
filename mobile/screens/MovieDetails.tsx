import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Image,
  ImageBackground,
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

type Props = {
  route: MovieDetailsScreenRouteProp;
};

export default function MovieDetails({ route }: Props): JSX.Element | null {
  const { movie } = route.params;
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
  } = movie;

  movie.videos = [
    {
      id: "105",
      iso_639_1: "en",
      iso_3166_1: "US",
      key: "qvsgGtivCgs",
      name:
        "Back To The Future (1985) Theatrical Trailer - Michael J. Fox Movie HD",
      site: "YouTube",
      size: 720,
      type: "Trailer",
      url: "https://www.youtube.com/watch?v=qvsgGtivCgs",
    },
  ];

  movie.genres = [
    {
      id: 12,
      name: "Adventure",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 878,
      name: "Science Fiction",
    },
    {
      id: 10751,
      name: "Family",
    },
  ];

  const [currentTab, setCurrentTab] = useState(0);

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
                  : "rgba(19,33,45,0.4)",
                Colors.dark.background,
              ]}
              style={[StyleSheet.absoluteFill]}
            />
            <Text style={styles.movieTitle}>{title}</Text>
            {videos && videos?.length > 0 && (
              <TouchableOpacity style={styles.downloadButton}>
                <Text
                  style={styles.downloadText}
                  onPress={() => Linking.openURL(videos[0].url)}
                >
                  TRAILER
                </Text>
              </TouchableOpacity>
            )}
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
              tabs={["details", "search", "history"]}
              currentTab={currentTab}
              handleTabChange={(i) => setCurrentTab(i)}
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
    height: "300@ms0.1",
    transform: [{ rotateX: "180deg" }],
  },
  header: {
    padding: 20,
    backgroundColor: Colors.dark.background,
  },
  movieTitle: {
    fontSize: "24@ms0.3",
    fontWeight: "600",
    marginBottom: "10@ms0.3",
  },
  downloadButton: {
    backgroundColor: "white",
    padding: 12,
    alignSelf: "baseline",
    borderRadius: 4,
    marginBottom: "10@ms0.3",
  },
  downloadText: {
    color: Colors.dark.secondary,
    fontWeight: "bold",
    fontSize: 13,
  },
  desc: {
    fontSize: "10@ms0.3",
    fontWeight: "600",
    marginBottom: "10@ms0.3",
  },
});
