import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  LayoutAnimation,
  StyleProp,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import Colors from "../constants/Colors";
import { Text, View } from "./Themed";
import { useTranslation } from "react-i18next";
import placeholder from "lodash/fp/placeholder";

type Props = {
  wrapperInputStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
  placeholder?: string;
  value: string;
};

export default function InputBox(params: Props): JSX.Element | null {
  const { t } = useTranslation();

  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
        params.wrapperInputStyle,
      ]}
    >
      <View style={[styles.inputWrapper]}>
        <TextInput
          autoCapitalize={"none"}
          value={params.value}
          placeholder={params.placeholder}
          placeholderTextColor={Colors.dark.grey}
          style={[styles.input, params.textInputStyle]}
          onChangeText={params.onChangeText}
        />
      </View>
    </View>
  );
}

const styles = ScaledSheet.create({
  inputWrapper: {
    backgroundColor: Colors.dark.secondary,
    borderRadius: "6@ms0.1",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    height: 50,
    flex: 1,
    fontSize: "14@ms0.1",
    color: "white",
    fontWeight: "600",
    paddingHorizontal: 16,
  },
  cancelText: {
    paddingVertical: "8@ms0.1",
    fontSize: "14@ms0.1",
  },
  icon: {
    paddingHorizontal: "10@ms0.1",
    paddingVertical: "4@ms0.1",
    color: Colors.dark.grey,
  },
});
