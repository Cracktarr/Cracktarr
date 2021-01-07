import React from "react";
import { ScaledSheet } from "react-native-size-matters";
import { TouchableWithoutFeedback, View } from "react-native";
import { Text } from "./Themed";

export type Props = {
  tabs: string[];
  currentTab: number;
  handleTabChange: (i: number) => void;
};

export default function DetailsTabs(params: Props): JSX.Element | null {
  const { tabs, currentTab, handleTabChange } = params;
  return (
    <View>
      <View style={styles.container}>
        {tabs.map((item, i) => (
          <TouchableWithoutFeedback
            key={item}
            onPress={() => handleTabChange(i)}
          >
            <View style={styles.item}>
              <Text
                style={[
                  styles.text,
                  {
                    opacity: currentTab === i ? 1 : 0.5,
                    fontWeight: currentTab === i ? "bold" : "normal",
                  },
                ]}
              >
                {item.toUpperCase()}
              </Text>
              <View
                style={[
                  styles.indicator,
                  { opacity: currentTab === i ? 1 : 0 },
                ]}
              />
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <View style={styles.bottomLine} />
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 32,
  },
  item: {
    flex: 1 / 3,
  },
  text: {
    fontSize: 15,
    letterSpacing: 1.5,
    textAlign: "center",
    paddingBottom: 10,
  },
  indicator: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "white",
  },
  bottomLine: {
    height: 1,
    backgroundColor: "white",
    opacity: 0.2,
  },
});
