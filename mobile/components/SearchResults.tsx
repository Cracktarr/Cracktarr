import { useTranslation } from "react-i18next";
import { Text } from "./Themed";
import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../constants/Colors";

export type Props = {
  results: Result[];
};

export type ResultProps = {
  item: Result;
};

export type Result = {
  title: string;
  indexer: string;
  size: number;
  peers: number;
  leechers: number;
};

function Result({ item }: ResultProps): JSX.Element | null {
  const { t } = useTranslation();
  const { title, indexer, size, peers, leechers } = item;

  return (
    <View style={styles.itemWrapper}>
      <View style={{ flex: 1 }}>
        <Text style={styles.subtitle}>
          {indexer} • {size}GB • {peers}/{leechers}
        </Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>4K REMUX• MULTi • HDR</Text>
      </View>
      <MaterialCommunityIcons
        name="download-circle-outline"
        size={32}
        style={{ marginLeft: 16 }}
        color={Colors.dark.grey}
      />
    </View>
  );
}

export default function SearchResults(params: Props): JSX.Element | null {
  const { t } = useTranslation();
  const { results } = params;

  return (
    <View style={[styles.container]}>
      {results.map((item, i) => (
        <Result item={item} key={i} />
      ))}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    marginTop: 4,
  },
  itemWrapper: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: "14@ms0.1",
    marginVertical: 6,
  },
  subtitle: {
    fontSize: "10@ms0.1",
    fontWeight: "600",
  },
});
