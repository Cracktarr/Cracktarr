import * as React from "react";
import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { ScaledSheet } from "react-native-size-matters";
import { Text } from "../components/Themed";
import Colors from "../constants/Colors";
import InputBox from "../components/InputBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../api/api";

const saveToAsyncStorage = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export default function SettingsScreen(): JSX.Element | null {
  const [baseUrl, setBaseUrl] = useState<string | null>(null);

  const getBaseUrl = async () => {
    try {
      const value = await AsyncStorage.getItem("BASE_URL");
      setBaseUrl(value);
      console.log(value);
    } catch (e) {
      console.log(e);
    }
    return null;
  };

  useEffect(() => {
    getBaseUrl();
  }, []);

  useEffect(() => {
    saveToAsyncStorage("BASE_URL", baseUrl);
  }, [baseUrl]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.dark.background }}>
      <ScrollView style={styles.container}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.itemTitle}>URL Base</Text>

        <InputBox
          value={baseUrl}
          onChangeText={(text) => setBaseUrl(text)}
          placeholder={"Ex: http://42.42.42.42:2342"}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: "30@ms",
    fontWeight: "700",
    marginVertical: 20,
  },
  itemTitle: {
    marginBottom: 8,
    fontWeight: "600",
  },
});
