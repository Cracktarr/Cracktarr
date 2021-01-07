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
import i18n from "i18n-js";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import Colors from "../constants/Colors";
import { Text, View } from "./Themed";

type SearchBarParamsType = {
  wrapperInputStyle?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  onChangeText: (text: string) => void;
};

export default function SearchBar(
  params: SearchBarParamsType,
): JSX.Element | null {
  const [showCancel, setShowCancel] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [value, setValue] = useState("");
  const textInput = useRef<TextInput>(null);

  const animateCancelButton = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowCancel(!showCancel);
  };

  const updateText = (text: string) => {
    params.onChangeText(text);
    setValue(text);
  };

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (value.length === 0) {
      setShowReset(false);
    } else {
      setShowReset(true);
    }
  }, [value]);

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
        <MaterialIcons
          size={moderateScale(18, 0.1)}
          name="search"
          style={styles.icon}
        />
        <TextInput
          ref={textInput}
          value={value}
          onFocus={animateCancelButton}
          onEndEditing={animateCancelButton}
          placeholder={i18n.t("search")}
          placeholderTextColor={Colors.dark.grey}
          style={[styles.input, params.textInputStyle]}
          onChangeText={updateText}
        />
        {showReset && (
          <TouchableOpacity onPress={() => updateText("")}>
            <MaterialIcons
              size={moderateScale(18, 0.1)}
              name="cancel"
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      </View>
      {showCancel && (
        <TouchableOpacity
          style={{ justifyContent: "center" }}
          onPress={() => textInput.current?.blur()}
        >
          <Text style={styles.cancelText}>Annuler</Text>
        </TouchableOpacity>
      )}
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
    marginRight: 10,
  },
  input: {
    paddingVertical: "8@ms0.1",
    flex: 1,
    fontSize: "14@ms0.1",
    color: "white",
    fontWeight: "600",
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
