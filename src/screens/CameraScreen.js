import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  const takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true }; //1是最好的 0是最低的
      const data = await this.camera.takePictureAsync(options);
      console.log(data);

      storeData(data.base64);


      console.log(getData());
      

    }
  };

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('storage_Key123', value)
      console.log("存好了");
    } catch (e) {
      // saving error
    }
  }
  

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ref={(r) => {
          camera = r;
        }}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}
          >
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              takePicture();
            }}
          >
            <Text style={styles.text}> 拍照 </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
});
