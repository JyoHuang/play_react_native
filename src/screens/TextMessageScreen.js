import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  SafeAreaView,
  FlatList,
  TextInput,
  Modal,
  TouchableHighlight,
} from "react-native";
import Constants from "expo-constants";
import { Keyboard } from 'react-native'

export default function TextMessageScreen(props) {
  const [dataSource, setDataSource] = useState([]);
  const [myState, setMyState] = useState(true);

  const [messageInput, setMessageInput] = useState("");
  const [editItem, setEditItem] = useState({});

  const clickMenu = function () {
    console.log("出現menu");
    props.navigation.openDrawer();
  };
  const clickGetTextMessage = function () {
    console.log("clickGetTextMessage");
    getTextMessage();
  };
  //這個函數主要是call api來拿取文字相關的內容
  const getTextMessage = function () {
    const REQUEST_URL =
      "https://playlaravel.createdigit.com/api/message/gettextmessage";
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData=" + JSON.stringify(responseData));
        //主要把取得的內如放到dataSource這個變數，然後藉此更新UI上面的列表(Flatlist)
        setDataSource(responseData.messages);
        setMyState(!myState);
        console.log("myState=" + myState);
      })
      .catch((error) => {
        console.log("error=", error);
      });
  };

  const clickEditTextMessage = function (item) {
    setMessageEditInput(item.message)
    setEditItem(item)
    setModalVisible(true);
  };


  const renderTextMessageData = function (item) {
    return (
      <View style={styles.listViewArea}>
        <Text>{item.id}</Text>
        <Text>{item.message}</Text>
        <TouchableOpacity
          style={styles.styleAddTextMessageButton}
          onPress={() => clickEditTextMessage(item)}
        >
          <Text style={styles.styleAddTextMessageText}>編輯</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.styleAddTextMessageButton}
          onPress={() => clickDeleteTextMessage(item.id)}
        >
          <Text style={styles.styleAddTextMessageText}>刪除</Text>
        </TouchableOpacity>
      </View>
    );
  };
  //主要來新增一筆文字內容
  const clickAddTextMessage = function () {
    
    const REQUEST_URL =
      "https://playlaravel.createdigit.com/api/message/addtextmessage";
    fetch(REQUEST_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messageInput,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData=" + JSON.stringify(responseData));
        Keyboard.dismiss()
        getTextMessage()
      })
      .catch((error) => {
        console.log("error=", error);
      });
  };

  const [modalVisible, setModalVisible] = useState(false);

  const [messageEditInput , setMessageEditInput] = useState('');
  //主要來更新一筆文在內容
  const updateTextImageCallAPI = function(){
    const REQUEST_URL =
      "https://playlaravel.createdigit.com/api/message/updatetextmessage";
    fetch(REQUEST_URL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messageEditInput,
        id: editItem.id,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("responseData=" + JSON.stringify(responseData));
        setModalVisible(false)
        getTextMessage()
      })
      .catch((error) => {
        console.log("error=", error);
      });
  }
  //主要來刪除一筆文字內容
  const clickDeleteTextMessage = function(idToDelete){
    const REQUEST_URL =
      "https://playlaravel.createdigit.com/api/message/deletetextmessage";
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
        getTextMessage()
      })
      .catch((error) => {
        console.log("error=", error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerZ1}>
        <View style={styles.menuArea}>
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

        <Text>訊息內容</Text>
        <View style={styles.addNewArea}>
          <TextInput
            style={styles.textInput}
            placeholder="new message..."
            onChangeText={(text) => setMessageInput(text)}
            defaultValue={messageInput}
          />
          <TouchableOpacity
            style={styles.styleAddTextMessageButton}
            onPress={() => clickAddTextMessage()}
          >
            <Text style={styles.styleAddTextMessageText}>新增</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.styleGetTextMessageButton}
          onPress={() => clickGetTextMessage()}
        >
          <Text>取得訊息內容</Text>
        </TouchableOpacity>
        <FlatList
          style = {styles.flatlistStyle}
          data={dataSource}
          renderItem={({ item }) => renderTextMessageData(item)}
          keyExtractor={(item, index) => index.toString()}
          extraData={myState}
        />
      </View>
      {/* 對話框 */}
      <View style={styles.centeredViewZ2}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>修改</Text>
              <TextInput
                style={styles.textInput}
                placeholder="new message..."
                onChangeText={(text) => setMessageEditInput(text)}
                defaultValue={messageEditInput}
              />

              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#2196F3" }}
                onPress={() => {
                  updateTextImageCallAPI();
                }}
              >
                <Text style={styles.textStyle}>更新</Text>
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
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  containerZ1 : {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    zIndex : 1,
    position: 'absolute',
    height : '100%'
  },

  menuArea: {
    flexDirection: "row-reverse",
    height: 100,
    width: "100%",
  },
  styleMenuButton: {
    margin: 20,
  },
  styleGetTextMessageButton: {
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
  addNewArea: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
  },
  textInput: {
    backgroundColor: "gray",
    width: "60%",
    fontSize: 30,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  styleAddTextMessageButton: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 10,
    marginLeft: 20,
  },
  styleAddTextMessageText: {
    color: "white",
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  centeredViewZ2 :{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    zIndex : 2,
    position: 'absolute'
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
    marginTop : 10
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
  flatlistStyle : {
    flex : 1,
    paddingBottom: 20
  }
});
