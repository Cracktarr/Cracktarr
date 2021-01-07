import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Text, View } from "./Themed";

export type BadgeParamsType = {
  title: string;
  style?: StyleProp<ViewStyle>;
};

export default function Badge(params: BadgeParamsType): JSX.Element | null {
  return (
    <View style={[styles.container, params.style]}>
      <Text style={styles.title}>{params.title}</Text>
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: "8@ms0.3",
    fontWeight: "600",
    marginHorizontal: "6@ms",
    marginVertical: "2@ms0.3",
    textTransform: "capitalize",
  },
});
