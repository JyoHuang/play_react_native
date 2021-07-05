import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import Constants from "expo-constants";

export default function GoogleMapScreen(props) {
  const clickMenu = function () {
    console.log("出現menu");
    props.navigation.openDrawer();
  };
  return (
    <SafeAreaView>
      <View style={styles.containerZ1}>
        <MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} />
      </View>
      <View style={styles.containerZ2}>
        <TouchableOpacity
          style={styles.styleMenuButton}
          onPress={() => clickMenu()}
        >
          <Image
            style={{
              resizeMode: "cover",
              width: 50,
              height: 50,
            }}
            source={require("../../assets/img/menu.png")}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  containerZ1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    height: "100%",
  },
  containerZ2: {
    flex: 1,
    backgroundColor: "#abc",
    zIndex: 2,
    flexDirection: "row",
    height: 20,
  },
  styleMenuButton: {
    margin: 20,
  },
});
