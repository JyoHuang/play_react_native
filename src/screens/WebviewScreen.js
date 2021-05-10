import * as React from 'react';
import { WebView } from 'react-native-webview';

export default class WebviewScreen extends React.Component {
  render() {
    return <WebView source={{ uri: 'https://expo.io' }} style={{ marginTop: 20 }} />;
  }
}