import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import ImageMessageScreen from "./ImageMessageScreen";
import CameraScreen from "./CameraScreen";


import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function ImageMessageSwitchScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ImageMessageScreen"
        component={ImageMessageScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
