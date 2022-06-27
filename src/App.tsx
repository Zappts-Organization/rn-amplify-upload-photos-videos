import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Home from "./pages/Home";
import { withAuthenticator } from "aws-amplify-react-native";

import { Localei18n } from "./components/Locale/i18n";

import { AuthAmplify } from "./amplify/Auth/AuthAmplify";

const locale = Localei18n;
const auth = AuthAmplify;

function App() {
  return (
    locale &&
    auth && (
      <View style={styles.container}>
        <StatusBar translucent />
        <Home />
      </View>
    )
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
