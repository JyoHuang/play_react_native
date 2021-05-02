import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
} from "react-native";
import Constants from "expo-constants";

export default function ImageMessageScreen(props) {

  const [dataSource, setDataSource] = useState([])
  const [myState, setMyState] = useState(true) 

  const clickOpacity = function () {
    console.log("出現menu");
    props.navigation.openDrawer();
  };

  const clickGetImageMessage = function(){
    console.log('取得圖片');
    getImageMessage();
  }

  const getImageMessage = function(){
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
  }

  const clickDeleteImageMessage = function(idToDelete){
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
        getImageMessage()
      })
      .catch((error) => {
        console.log("error=", error);
      });
  }

  const renderImageMessageData = function(item){
    return (
      <View style={styles.listViewArea}>
        <Text>{item.id}</Text>
        <Image
          style={{
            resizeMode: 'cover',
            width: 200,
            height: 200,
            backgroundColor : 'red',
          }}
          source={{
            uri: 'data:image/png;base64,'+item.image_local,
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
  }

  return (
    <SafeAreaView style={styles.container}>
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
      <Text>圖片內容</Text>
      <TouchableOpacity
          style={styles.styleGetImageMessageButton}
          onPress={() => clickGetImageMessage()}
        >
          <Text>取得圖片內容</Text>
        </TouchableOpacity>
        <FlatList
          style = {styles.flatlistStyle}
          data={dataSource}
          renderItem={({ item }) => renderImageMessageData(item)}
          keyExtractor={(item, index) => index.toString()}
          extraData={myState}
        />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
    alignItems : 'center'
  },
  menuArea : {
    alignItems : 'flex-end',
    width : '100%'
  },
  styleButton : {
    margin : 20
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
  },
  listViewUrl : {
    width : 80
  }
});
