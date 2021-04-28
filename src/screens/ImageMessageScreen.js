import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

export default function ImageMessageScreen(props) {
  const clickOpacity = function () {
    console.log("出現menu");
    props.navigation.openDrawer();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.styleButton}
        onPress={() => clickOpacity()}
      >
        <Image
          style={{
            resizeMode: "cover",
            width: 100,
            height: 100,
          }}
          source={require("../../assets/img/menu.png")}
        />
      </TouchableOpacity>
      <Text>圖片內容</Text>

      <StatusBar style="auto" />
    </View>
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
