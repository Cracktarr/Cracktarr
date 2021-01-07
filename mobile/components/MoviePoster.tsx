import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ImageBackground, TouchableOpacity, View } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import Colors from "../constants/Colors";
import { Movie } from "../models/Movie";
import { MovieDetailsScreenNavigationProp } from "../types";
import { Text } from "./Themed";

export default function MoviePoster(movie: Movie): JSX.Element | null {
  const { lezarr_status, poster_path, title } = movie;
  const { navigate } = useNavigation<MovieDetailsScreenNavigationProp>();
  const [showFallbackView, setShowFallbackView] = useState(false);

  return (
    <TouchableOpacity
      delayPressIn={100}
      style={styles.container}
      onPress={() => navigate("MovieDetails", { movie })}
    >
      <ImageBackground
        imageStyle={{ borderRadius: moderateScale(4) }}
        style={styles.posterCard}
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
        <View
          style={[
            styles.statusView,
            {
              backgroundColor:
                lezarr_status === "missing"
                  ? Colors.dark.red
                  : Colors.dark.tint,
            },
          ]}
        />
      </ImageBackground>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = ScaledSheet.create({
  container: {
    width: "100@ms",
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
    height: "150@ms",
    width: "100%",
    borderRadius: "4@ms",
    justifyContent: "flex-end",
    overflow: "hidden",
    backgroundColor: Colors.dark.secondary,
  },
  title: {
    marginTop: 6,
    fontSize: "10@ms0.2",
    textAlign: "center",
    textAlignVertical: "center",
  },
  statusView: {
    width: "100%",
    height: "4@ms",
  },
});
