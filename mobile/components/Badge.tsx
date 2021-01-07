import React from "react";
import { StyleProp, ViewStyle, View } from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import { Text } from "./Themed";
import Colors from "../constants/Colors";

export type BadgeParamsType = {
  title: string;
  style?: StyleProp<ViewStyle>;
};

export type BadgeListParamsType = {
  status: string;
  resolution: number;
  language: string;
};

export function Badge(params: BadgeParamsType): JSX.Element | null {
  return (
    <View style={[styles.container, params.style]}>
      <Text style={styles.title}>{params.title}</Text>
    </View>
  );
}

export function BadgeList(params: BadgeListParamsType): JSX.Element | null {
  const { status, resolution, language } = params;
  return (
    <View style={{ flexDirection: "row", marginBottom: moderateScale(4) }}>
      {status !== "" && (
        <Badge
          title={status}
          style={{
            backgroundColor:
              status === "missing" ? Colors.dark.red : Colors.dark.tint,
          }}
        />
      )}
      {resolution !== 0 && (
        <Badge
          title={`${resolution}p`}
          style={{
            marginLeft: 4,
            borderColor: Colors.dark.grey,
            borderWidth: moderateScale(2, 0.05),
          }}
        />
      )}
      {language !== "" && (
        <Badge
          title={language}
          style={{
            marginLeft: 4,
            borderColor: Colors.dark.grey,
            borderWidth: moderateScale(2, 0.05),
          }}
        />
      )}
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
