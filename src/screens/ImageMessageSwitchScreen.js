import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import ImageMessageScreen from "./ImageMessageScreen";
import TakePicture from "./TakePicture";
import ImagePickerExample from "./ImagePickerExample";


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
        name="ImagePickerExample"
        component={ImagePickerExample}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TakePicture"
        component={TakePicture}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
