import { StatusBar } from "expo-status-bar";
import React from "react";
import { Platform, UIManager } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import i18n from "i18n-js";
import { fr } from "./assets/i18n/fr";
import { en } from "./assets/i18n/en";

// i18n.locale = Localization.locale; TODO: Change it when translation is ready
i18n.locale = "en";
// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;
i18n.translations = { fr, en };

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export const App: React.FunctionComponent = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar backgroundColor="#000000" style="light" />
      </SafeAreaProvider>
    );
  }
};

export default App;
