import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { MovieDetailsScreenRouteProp } from "../types";

type Props = {
  route: MovieDetailsScreenRouteProp;
};

export default function MovieDetails({ route }: Props): JSX.Element | null {
  const { movie } = route.params;
  const { poster_path, backdrop_path, title } = movie;

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
            <TouchableOpacity style={styles.downloadButton}>
              <Text style={styles.downloadText}>DOWNLOAD</Text>
            </TouchableOpacity>
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
    marginBottom: "16@ms0.3",
  },
  downloadButton: {
    backgroundColor: "white",
    padding: 12,
    alignSelf: "baseline",
    borderRadius: 4,
  },
  downloadText: {
    color: Colors.dark.secondary,
    fontWeight: "bold",
    fontSize: 13,
  },
});
