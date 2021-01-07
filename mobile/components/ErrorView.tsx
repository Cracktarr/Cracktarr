import React from "react";
import { Text, View } from "./Themed";
import { ScaledSheet } from "react-native-size-matters";
import { TouchableOpacity } from "react-native";
import { useTranslation } from "react-i18next";
import Colors from "../constants/Colors";

export type ErrorView = {
  title: string;
  onPress: () => void;
};

export default function ErrorView(params: ErrorView): JSX.Element | null {
  const { t } = useTranslation();

  return (
    <View style={[styles.container]}>
      <Text style={styles.title}>{params.title}</Text>
      <TouchableOpacity style={styles.button} onPress={params.onPress}>
        <Text style={styles.buttonText}>{t("try_again")}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    opacity: 0.5,
  },
  button: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.dark.tint,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.dark.tint,
    fontWeight: "bold",
  },
});
