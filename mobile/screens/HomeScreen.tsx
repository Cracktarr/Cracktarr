import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  LayoutAnimation,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { getLezarrStatistics, getRecentlyAddedMovies } from "../api/api";
import MovieCard from "../components/MovieCard";
import MoviePoster from "../components/MoviePoster";
import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { Movie } from "../models/Movie";
import { Statistics } from "../models/Statistics";
import { useTranslation } from "react-i18next";
import ErrorView from "../components/ErrorView";

export default function HomeScreen(): JSX.Element | null {
  const { navigate } = useNavigation();
  const { t } = useTranslation();
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [stats, setStats] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState<boolean>(false);

  const getMovies = async () => {
    try {
      const movies = await getRecentlyAddedMovies();
      const stats = await getLezarrStatistics();
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setMovies(movies);
      setStats(stats);
      setShowError(false);
    } catch (err) {
      setShowError(true);
    }
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      getMovies();
    }, []),
  );

  const renderHeader = (movies: Movie[]) => {
    return (
      <>
        <View>
          <Text>
            <Text style={styles.title}>{t("home_title")}</Text>
            <Text style={[styles.title, { color: Colors.dark.tint }]}>
              Lezarr
            </Text>
          </Text>
          <Text>
            {stats?.total_movies} {t("monitored")}, {stats?.missing_movies}{" "}
            {t("missing")}
          </Text>
        </View>

        <Text style={styles.sectionTitle}>{t("recently_downloaded")}</Text>

        <FlatList
          ItemSeparatorComponent={() => (
            <View
              style={{
                backgroundColor: "transparent",
                width: moderateScale(8),
              }}
            />
          )}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={movies}
          keyExtractor={(item, index) =>
            item.id?.toString() || index.toString()
          }
          renderItem={({ item }) => <MoviePoster {...item} />}
        />

        {movies.filter(
          (value) => new Date(value.release_date || "01/01/1979") > new Date(),
        ).length > 0 && (
          <Text style={styles.sectionTitle}>{t("upcoming_movies")}</Text>
        )}
        {movies.filter(
          (value) => new Date(value.release_date || "01/01/1979") > new Date(),
        ) && (
          <FlatList
            ItemSeparatorComponent={() => (
              <View
                style={{
                  backgroundColor: "transparent",
                  width: moderateScale(8),
                }}
              />
            )}
            showsHorizontalScrollIndicator={false}
            horizontal
            data={movies.filter(
              (value) =>
                new Date(value.release_date || "01/01/1979") > new Date(),
            )}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            renderItem={({ item }) => <MoviePoster {...item} />}
          />
        )}
        <Text style={styles.sectionTitle}>{t("all_movies")}</Text>
      </>
    );
  };

  if (loading || !movies) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="small" color={Colors.dark.tint} />
      </View>
    );
  }

  if (showError) {
    return (
      <ErrorView
        title={t("network_error")}
        onPress={() => {
          setLoading(true);
          getMovies();
        }}
      />
    );
  }

  if (movies?.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>{t("empty_lezarr")}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={movies}
        ListHeaderComponent={renderHeader(movies || [])}
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: "transparent",
              height: moderateScale(16),
            }}
          />
        )}
        contentContainerStyle={styles.flatList}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            delayPressIn={50}
            onPress={() => navigate("MovieDetails")}
          >
            <MovieCard movie={item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.dark.background,
  },
  flatList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: StatusBar.currentHeight ? 16 + StatusBar.currentHeight : 16,
  },
  title: {
    fontSize: "30@ms",
    fontWeight: "700",
  },
  sectionTitle: {
    fontWeight: "600",
    fontSize: "16@ms",
    marginTop: 20,
    marginBottom: 16,
  },
  message: {
    textAlign: "center",
    opacity: 0.5,
  },
});
