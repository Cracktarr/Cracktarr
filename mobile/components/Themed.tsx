import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
): string {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function Text(props: TextProps): JSX.Element | null {
  const { style, ...otherProps } = props;
  const color = Colors.dark.text;

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps): JSX.Element | null {
  const { style, ...otherProps } = props;
  const backgroundColor = Colors.dark.background;

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
