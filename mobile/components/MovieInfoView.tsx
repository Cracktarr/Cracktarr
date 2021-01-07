import { useTranslation } from "react-i18next";
import { Text } from "./Themed";
import { View } from "react-native";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { Movie } from "../models/Movie";
import { getFormattedRuntime } from "../utils/Formatting";

interface Props {
  movie: Movie;
}

interface DescItemProps {
  title: string;
  desc: string | null;
}

const DescItem = (params: DescItemProps) => {
  const { title, desc } = params;

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text>{desc}</Text>
    </View>
  );
};

export default function MovieInfoView(params: Props): JSX.Element | null {
  const { t } = useTranslation();
  const { overview, runtime, release_date, genres } = params.movie;

  return (
    <View style={[styles.container]}>
      <Text style={styles.sectionTitle}>{t("movie_details")}</Text>
      {overview && <Text>{overview}</Text>}
      {runtime && (
        <DescItem title={t("duration")} desc={getFormattedRuntime(runtime)} />
      )}
      {release_date && (
        <DescItem title={t("release_date")} desc={release_date} />
      )}
      {genres && genres.length > 0 && (
        <DescItem
          title={t("release_date")}
          desc={genres.map((g) => g.name).join(", ")}
        />
      )}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 20,
  },
  itemTitle: {
    opacity: 0.5,
    marginBottom: 4,
  },
});
