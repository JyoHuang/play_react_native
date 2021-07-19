import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AsyncStorageScreen(props) {
  const [textToSave, settextToSave] = React.useState("預設的文字");
  const [textToShow, settextToShow] = React.useState("");
  //儲存資料
  const storeData = async (value) => {
    try {
      //我可以自己改變數名稱(storage_Key_i_can_change)
      await AsyncStorage.setItem("@storage_Key_i_can_change", value);
    } catch (e) {
      // saving error
      console.log('error='+e);
    }
  };
  //取得資料
  const getData = async () => {
    try {
      //我可以自己改變數名稱(storage_Key_i_can_change)
      const value = await AsyncStorage.getItem("@storage_Key_i_can_change");
      if (value !== null) {
        //把之前的值顯示出來
        settextToShow(value)
      }
    } catch (e) {
      // error reading value
    }
  };
  const clickSave = function () {
    console.log('儲存起來'+textToSave);
    storeData(textToSave);
  };

  const clickLoad = function() {
    getData();
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={{  borderColor: "gray", borderWidth: 1, padding:20 }}
        onChangeText={(text) => settextToSave(text)}
        value={textToSave}
      />
      <TouchableOpacity style={styles.button} onPress={() => clickSave()}>
        <Text style={styles.text}>儲存</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => clickLoad()}>
        <Text style={styles.text}>顯示</Text>
      </TouchableOpacity>
      <Text>{textToShow}</Text>
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
  button: {
    marginTop: 20,
    backgroundColor: "blue",
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  text: {
    color: "white",
  },
});
