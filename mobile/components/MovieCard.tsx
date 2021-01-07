import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import Colors from "../constants/Colors";
import { Movie } from "../models/Movie";
import { MovieDetailsScreenNavigationProp } from "../types";
import { Text } from "./Themed";
import { BadgeList } from "./Badge";

type MovieCardParamsType = {
  movie: Movie;
  onPress?: () => void;
};

export default function MovieCard(
  params: MovieCardParamsType,
): JSX.Element | null {
  const {
    title,
    release_date,
    vote_average,
    overview,
    lezarr_status,
    resolution,
    language,
    poster_path,
  } = params.movie;
  const { navigate } = useNavigation<MovieDetailsScreenNavigationProp>();
  const [showFallbackView, setShowFallbackView] = useState(false);

  const handlePress = () => {
    const {
      onPress = () => {
        return;
      },
    } = params;
    if (lezarr_status.length > 0) {
      navigate("MovieDetails", { movie: params.movie });
    } else {
      onPress();
    }
  };

  return (
    <TouchableOpacity
      delayPressIn={100}
      onPress={() => handlePress()}
      style={styles.container}
    >
      <ImageBackground
        style={styles.posterCard}
        imageStyle={{ borderRadius: moderateScale(4) }}
        source={{
          uri: `https://image.tmdb.org/t/p/w600_and_h900_bestv2${poster_path}`,
        }}
        onError={() => setShowFallbackView(true)}
      >
        {showFallbackView && (
          <View style={styles.fallbackView}>
            <Text style={styles.fallbackText}>{title.charAt(0)}</Text>
          </View>
        )}
      </ImageBackground>
      <View style={styles.textWrapper}>
        <Text style={styles.title} numberOfLines={2}>
          {title}{" "}
        </Text>
        <Text style={styles.desc}>
          {release_date || "N/A"} •{" "}
          {vote_average ? `${Math.round(vote_average * 10)}%` : "N/A"}
        </Text>
        <BadgeList
          status={lezarr_status}
          resolution={resolution}
          language={language}
        />
        <Text style={[styles.desc, { flex: 1 }]} ellipsizeMode="tail">
          {overview}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    height: "120@ms",
  },
  fallbackText: {
    fontSize: "60@ms0.2",
    fontWeight: "200",
  },
  fallbackView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  posterCard: {
    height: "120@ms",
    aspectRatio: 2 / 3,
    justifyContent: "flex-end",
    backgroundColor: Colors.dark.secondary,
  },
  title: {
    fontSize: "14@ms0.3",
    fontWeight: "600",

    marginVertical: "4@ms",
  },
  desc: {
    fontSize: "10@ms0.3",
    opacity: 0.8,
    marginBottom: "4@ms",
  },
  textWrapper: {
    marginHorizontal: "10@ms",
    flex: 1,
  },
  added: {
    backgroundColor: Colors.dark.tint,
    borderRadius: "12@ms0.3",
    height: "12@ms0.3",
    width: "12@ms0.3",
    alignItems: "center",
    justifyContent: "center",
  },
});
