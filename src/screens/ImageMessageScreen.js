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
} from "react-native";
import Constants from "expo-constants";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ImageMessageScreen(props) {
  const [dataSource, setDataSource] = useState([]);
  const [myState, setMyState] = useState(true);

  const clickOpacity = function () {
    console.log("出現menu");
    props.navigation.openDrawer();
  };

  const clickGetImageMessage = function () {
    console.log("取得圖片");
    getImageMessage();
  };

  const getImageMessage = function () {
    const REQUEST_URL =
      "https://playlaravel.createdigit.com/api/message/getimagemessage";
      
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData=" + JSON.stringify(responseData));
        setDataSource(responseData.messages);
        setMyState(!myState);
        console.log("myState=" + myState);
      })
      .catch((error) => {
        console.log("error=", error);
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
  const clickAddImageMessage = function () {
    setModalVisible(true);
  };

  const [storage_Key123, setstorage_Key123] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==');
  //這邊可以加上useEffect去拿值!!
  
  useEffect(() => {
    // componentDidMount is here!
    //setstorage_Key123("data:image/png;base64," + getTempImageData())
    getTempImageData();

    return () => {
      // componentWillUnmount is here!
      
    };
    
  }, []);
  
  const getTempImageData = async () => {
    try {
      const value = await AsyncStorage.getItem('storage_Key123')
      if(value !== null) {
        console.log("他的值是"+value); 
        //因為它是非同步的 所以會回傳一個物件 因此這邊直接拿到值之後直接設定就好
        setstorage_Key123(value);
      }
    } catch(e) {
      // error reading value
      console.log("error="+e); //失敗囉
    }
  }

  const clickUploadImageMessage = function () {
    
    const REQUEST_URL =
      "https://playlaravel.createdigit.com/api/message/addimagebase64message";

    fetch(REQUEST_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_local: storage_Key123,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData=" + JSON.stringify(responseData));
        getImageMessage()
      })
      .catch((error) => {
        console.log("error=", error);
      });
  };

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
            uri: "https://createdigit.com/playlaravel/public/storage/files/" + item.image_local,
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
          style={styles.styleAddTextMessageButton}
          onPress={() => clickAddImageMessage()}
        >
          <Text style={styles.styleAddTextMessageText}>選取照片</Text>
        </TouchableOpacity>
        <Image
          style={{
            resizeMode: "cover",
            width: 200,
            height: 200,
            backgroundColor: "red",
          }}
          source={{
            uri: 'data:image/png;base64,'+storage_Key123,
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
                  props.navigation.push("CameraScreen");
                }}
              >
                <Text style={styles.textStyle}>拍照</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
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
});
