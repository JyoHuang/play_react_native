import { StatusBar } from "expo-status-bar";
import React, { useState, Component, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Keyboard,
  ActivityIndicator,
  FlatList,
  LogBox,
  Image,
  Switch,
} from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";

function RestScreen({ navigation, route }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [myLat, setmyLat] = useState(25.0);
  const [myLng, setmyLng] = useState(121.5);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      var latitude = location.coords.latitude;
      var longitude = location.coords.longitude;
      setmyLat(latitude);
      setmyLng(longitude);
      var level = 1; //先設定一個距離
      getrestaurant(level);
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const [loading, setLoading] = React.useState(false);
  const [DATA, setDATA] = React.useState([]);
  const [firstTime, setfirstTime] = React.useState(true);
  const renderItem = ({ item }) => <Item DATAItem={item} />;
  const Item = ({ DATAItem }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => clickItem({ DATAItem })}
    >
      <Text style={styles.itmeText}>{DATAItem.restaurant_name}</Text>
      <Text style={styles.itmeText}>{DATAItem.vegan}</Text>
      <Text style={styles.itmeText}>{DATAItem.distance}公里</Text>
    </TouchableOpacity>
  );
  const getrestaurant = function (level) {
    console.log(
      "latitude=" + myLat + "/longtitude=" + myLng + "/level=" + level
    );
    setLoading(true);
    const REQUEST_URL = "http://playlaravel.createdigit.com/api/getRestuarants";
    fetch(REQUEST_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lat: myLat,
        lng: myLng,
        level: level,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData=" + JSON.stringify(responseData));
        setLoading(false);
        if (responseData.success) {
          var restList = responseData.restaurant;
          for (var i = 0; i < restList.length; i++) {
            var latItem = restList[i].latitudes;
            var lngItem = restList[i].longitudes;
            var distance = calcCrow(latItem, lngItem, myLat, myLng);
            restList[i].distance = distance.toFixed(2);
          }
          restList.sort(function (a, b) {
            return a.distance - b.distance;
          });
          setDATA(restList);
        }
      })
      .catch((error) => {
        console.log("error=", error);
      });
  };
  const clickItem = function (DATAItem) {
    navigation.navigate("StudentsScreen", {
      DATAItemString: JSON.stringify(DATAItem),
    });
  };
  //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
  function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
  }

  // Converts numeric degrees to radians
  function toRad(Value) {
    return (Value * Math.PI) / 180;
  }

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* 主題畫面 */}
      <View
        // Button Linear Gradient
        colors={"#4eb5da"}
        style={{
          zIndex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Text style={styles.paragraph}>{text}</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          style={styles.listView}
        />
      </View>
    </View>
  );
}

export default RestScreen;

const styles = StyleSheet.create({
  statusColor: {
    backgroundColor: "#ffffff",
    height: Constants.statusBarHeight,
  },
  topbar: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    height: 80,
    alignItems: "center",
  },
  lsitbgimage: {
    marginTop: 80 + Constants.statusBarHeight,
  },
  title: {
    fontSize: 25,
    color: "rgb(51,159,189)",
    marginLeft: 30,
    flex: 1,
  },

  item: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  itmeText: {
    fontSize: 12,
    marginHorizontal: 10,
  },
  listView: {
    width: "100%",
  },
});
