import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import TextMessageScreen from "./TextMessageScreen";
import ImageMessageSwitchScreen from "./ImageMessageSwitchScreen";
import WebviewScreen from "./WebviewScreen";
import GoogleMapScreen from "./GoogleMapScreen";

const Drawer = createDrawerNavigator();

export default function MainScreen() {
  return (
    <NavigationContainer
    independent={true}>
      <Drawer.Navigator initialRouteName="TextMessageScreen"
     
      >
        <Drawer.Screen name="TextMessageScreen" component={TextMessageScreen} />
        <Drawer.Screen
          name="ImageMessageSwitchScreen"
          component={ImageMessageSwitchScreen}
        />
        <Drawer.Screen name="WebviewScreen" component={WebviewScreen} />
        <Drawer.Screen name="GoogleMapScreen" component={GoogleMapScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
