import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import BeginScreen from "./src/screens/BeginScreen";
import MainScreen from "./src/screens/MainScreen";
import MainDrawerScreen from "./src/screens/MainDrawerScreen";
import AsyncStorageScreen from "./src/screens/AsyncStorageScreen";
import RestScreen from "./src/screens/RestScreen";
import DetectFoodsScreen from "./src/screens/DetectFoodsScreen";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="DetectFoodsScreen"
          component={DetectFoodsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RestScreen"
          component={RestScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AsyncStorageScreen"
          component={AsyncStorageScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BeginScreen"
          component={BeginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
