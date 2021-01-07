import * as React from "react";
import { SafeAreaView } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Text } from "../components/Themed";
import Colors from "../constants/Colors";

export default function ActivityScreen(): JSX.Element | null {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ opacity: 0.8 }}>Development in progress ...</Text>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.dark.background,
  },
});
