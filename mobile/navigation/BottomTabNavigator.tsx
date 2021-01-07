/* eslint-disable */

import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ActivityScreen from "../screens/ActivityScreen";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import SettingsScreen from "../screens/SettingsScreen";
import { BottomTabParamList } from "../types";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: Colors[colorScheme].tint,
        style: { backgroundColor: Colors.dark.background },
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",

          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: "Search",
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="ActivityScreen"
        component={ActivityScreen}
        options={{
          title: "Activity",
          tabBarIcon: ({ color }) => <TabBarIcon name="timer" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="settings" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: { name: string; color: string }) {
  return <MaterialIcons size={26} {...props} />;
}
