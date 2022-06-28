import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./pages/Home";
import { withAuthenticator } from "aws-amplify-react-native";

import localei18n from "./components/Locale/i18n";
import authAmplify from "./amplify/Auth/AuthAmplify";

localei18n();
authAmplify();

function App() {
  return (
    <View style={styles.container}>
      <StatusBar translucent />
      <Home />
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
});

export default withAuthenticator(App);
