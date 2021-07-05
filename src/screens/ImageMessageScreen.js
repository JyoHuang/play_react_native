import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  Modal,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import exampleImage from "../../assets/favicon.png"

export default function ImageMessageScreen(props) {
  const [dataSource, setDataSource] = useState([]);
  const [myState, setMyState] = useState(true);


  const exampleImageUri = Image.resolveAssetSource(exampleImage).uri

  const [selectedImageUri, setselectedImageUri] = useState(
    exampleImageUri
  );

  const clickOpacity = function () {
    console.log("出現menu");
    props.navigation.openDrawer();
  };

  const clickGetImageMessage = function () {
    console.log("取得圖片");
    getImageMessage();
  };
  //主要取得圖片相關內容
  const getImageMessage = function () {
    setloadingVisible(true);
    const REQUEST_URL =
      "https://playlaravel.createdigit.com/api/message/getimagemessage";

    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData=" + JSON.stringify(responseData));
        setDataSource(responseData.messages);
        setMyState(!myState);
        console.log("myState=" + myState);
        setloadingVisible(false);
      })
      .catch((error) => {
        console.log("error=", error);
        setloadingVisible(false);
      });
  };

  const clickDeleteImageMessage = function (idToDelete) {
    const REQUEST_URL =
      "https://playlaravel.createdigit.com/api/message/deleteimagemessage";
    fetch(REQUEST_URL, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: idToDelete,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData=" + JSON.stringify(responseData));
        getImageMessage();
      })
      .catch((error) => {
        console.log("error=", error);
      });
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);
  const clickAddImageMessage = function () {
    onPress();
    console.log('按了這個按鈕count='+count);
    setModalVisible(true);
  };



  const getTempImageData = async () => {
    try {
      const value = await AsyncStorage.getItem("storage_Key123");
      if (value !== null) {
        console.log("他的值是" + value);
        //因為它是非同步的 所以會回傳一個物件 因此這邊直接拿到值之後直接設定就好
        setstorage_Key123(value);
      }
    } catch (e) {
      // error reading value
      console.log("error=" + e); //失敗囉
    }
  };

  const clickUploadImageMessage = function () {
    let localUri = selectedImageUri;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    console.log("localUri="+localUri)

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append("file-to-upload", { uri: localUri, name: filename, type });

    setloadingVisible(true);
    const REQUEST_URL =
      "https://playlaravel.createdigit.com/api/message/addimagemessage";

    fetch(REQUEST_URL, {
      method: "POST",
      body: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData=" + JSON.stringify(responseData));
        getImageMessage();
      })
      .catch((error) => {
        console.log("error=", error);
        setloadingVisible(false);
      });
  };

  const [loadingVisible, setloadingVisible] = useState(false);

  const renderImageMessageData = function (item) {
    return (
      <View style={styles.listViewArea}>
        <Text>{item.id}</Text>
        <Image
          style={{
            resizeMode: "cover",
            width: 200,
            height: 200,
            backgroundColor: "red",
          }}
          source={{
            uri:
              "https://createdigit.com/playlaravel/public/storage/files/" +
              item.image_local,
          }}
        />
        <TouchableOpacity
          style={styles.styleAddTextMessageButton}
          onPress={() => clickEditTextMessage(item)}
        >
          <Text style={styles.styleAddTextMessageText}>編輯</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.styleAddTextMessageButton}
          onPress={() => clickDeleteImageMessage(item.id)}
        >
          <Text style={styles.styleAddTextMessageText}>刪除</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerZ1}>
        <View style={styles.menuArea}>
          <TouchableOpacity
            style={styles.styleButton}
            onPress={() => clickOpacity()}
          >
            <Image
              style={{
                resizeMode: "cover",
                width: 60,
                height: 60,
              }}
              source={require("../../assets/img/menu.png")}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
        delayPressIn={0}
          style={styles.styleAddTextMessageButton}
          onPress={() => clickAddImageMessage()}
        >
          <View style={styles.button}>
            <Text style={styles.buttonText}>選取照片</Text>
          </View>
        </TouchableOpacity>
        <Image
          style={{
            resizeMode: "cover",
            width: 200,
            height: 200,
            backgroundColor: "red",
          }}
          source={{
            uri: selectedImageUri,
          }}
        />
        <TouchableOpacity
          style={styles.styleAddTextMessageButton}
          onPress={() => clickUploadImageMessage()}
        >
          <Text style={styles.styleAddTextMessageText}>上傳</Text>
        </TouchableOpacity>
        <Text>圖片內容</Text>
        <TouchableOpacity
          style={styles.styleGetImageMessageButton}
          onPress={() => clickGetImageMessage()}
        >
          <Text>取得圖片內容</Text>
        </TouchableOpacity>
        <FlatList
          style={styles.flatlistStyle}
          data={dataSource}
          renderItem={({ item }) => renderImageMessageData(item)}
          keyExtractor={(item, index) => index.toString()}
          extraData={myState}
        />
      </View>
      {/* 對話框 */}
      <View style={styles.centeredViewZ2}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(false);
                  props.navigation.push("TakePicture", {
                    functionsetselectedImageUri: (arg) =>
                      setselectedImageUri(arg),
                  });
                  //props.navigation.push("TakePicture");
                }}
              >
                <Text style={styles.textStyle}>拍照</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(false);
                  props.navigation.push("ImagePickerExample",{
                    functionsetselectedImageUri: (arg) =>
                      setselectedImageUri(arg),
                  });
                }}
              >
                <Text style={styles.textStyle}>選擇照片</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>取消</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.containerZ3}>
        <ActivityIndicator size="large" animating={loadingVisible} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
    alignItems: "center",
  },
  menuArea: {
    alignItems: "flex-end",
    width: "100%",
  },
  styleButton: {
    margin: 20,
  },
  styleGetImageMessageButton: {
    marginTop: 20,
    backgroundColor: "gray",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 20,
  },
  listViewArea: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  styleAddTextMessageButton: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 10,
    marginLeft: 20,
    marginBottom: 20,
  },
  listViewUrl: {
    width: 80,
  },
  containerZ1: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    height: "100%",
  },
  containerZ3: {
    flex: 1,
    alignItems: "center",
    zIndex: 3,
    justifyContent: "center",
    height: "100%",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  centeredViewZ2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    zIndex: 2,
    position: "absolute",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  flatlistStyle: {
    flex: 1,
    paddingBottom: 20,
  },


  button: {
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white'
  }
});
