import * as React from 'react';
import MapView , { PROVIDER_GOOGLE }from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


export default function GoogleMapScreen() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={MapView.PROVIDER_GOOGLE} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});