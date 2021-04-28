import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";


export default function BeginScreen(props) {
    const clickButton = function(){
      console.log('前往下一頁囉')
      props.navigation.push('MainScreen')
    }

    return (
      <View style={styles.container}>
        <Text>play it</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={()=> clickButton()}
        >
          <Text
            style={styles.text}
          >前往</Text>
        </TouchableOpacity>

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
    button : {
      marginTop : 20,
      backgroundColor : 'blue',
      borderRadius : 6,
      paddingVertical : 10,
      paddingHorizontal : 40,
    },
    text:{
      color : 'white'
  
    }
  });
  
