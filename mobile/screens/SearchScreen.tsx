import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  LayoutAnimation,
  SafeAreaView,
  StatusBar,
} from "react-native";
import i18n from "i18n-js";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { useDebouncedCallback } from "use-debounce/lib";
import { addMovie, searchMovies } from "../api/api";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import { Text, View } from "../components/Themed";
import { Movie } from "../models/Movie";
import Colors from "../constants/Colors";

export default function SearchScreen(): JSX.Element | null {
  const [text, setText] = useState("");
  const [results, setResults] = useState<Movie[] | null>(null);
  const [loading, setLoading] = useState(false);
  const debounced = useDebouncedCallback((value) => {
    setText(value);
  }, 200);

  const getResults = async () => {
    try {
      const result = await searchMovies(text);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setResults(result);
    } catch (err) {
      return;
    }
    setLoading(false);
  };

  const onChangeText = (text: string) => {
    if (text.length === 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setResults(null);
    }
    debounced.callback(text);
  };

  const addMovieById = async (id?: number) => {
    if (!id) throw "id is null";
    try {
      await addMovie(id);
      const result = await searchMovies(text);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setResults(result);
    } catch (err) {
      alert(i18n.t("failed_add_movie"));
      return;
    }
  };

  useEffect(() => {
    if (text.length === 0) {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setResults(null);
    } else {
      setLoading(true);
      getResults();
    }
  }, [text]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <SearchBar
        wrapperInputStyle={{
          marginTop: StatusBar.currentHeight
            ? 10 + StatusBar.currentHeight
            : 10,
          marginHorizontal: 10,
        }}
        onChangeText={onChangeText}
      />
      {!results && (
        <Text style={styles.placeholderText}>
          {i18n.t("search_description")}
        </Text>
      )}

      <View style={styles.container}>
        {loading && !results && text.length > 2 ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            style={{ paddingHorizontal: 10, paddingVertical: 26, flex: 1 }}
            data={results}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  backgroundColor: "transparent",
                  height: moderateScale(16),
                }}
              />
            )}
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) =>
              item.id?.toString() || index.toString()
            }
            renderItem={({ item }) => (
              <MovieCard
                movie={item}
                onPress={() =>
                  Alert.alert(item.title || "", i18n.t("alert_add_movie"), [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "YES",
                      onPress: () => {
                        addMovieById(item.id);
                      },
                    },
                  ])
                }
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  placeholderText: {
    alignSelf: "center",
    textAlign: "center",
    margin: 20,
    opacity: 0.5,
  },
});
