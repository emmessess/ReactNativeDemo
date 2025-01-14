import React from "react";
import { View, Button, StyleSheet } from "react-native";
import NativeLocationTracking from "./specs/NativeLocationTracking";

const BackgroundLocationScreen = () => {
  const startService = () => {
    NativeLocationTracking.startService();
  };

  // Define a function to stop the service when button is pressed
  const stopService = () => {
    NativeLocationTracking.stopService();
  };

  return (
    <View style={styles.container}>
      <Button title="Start Background Location" onPress={startService} />
      <View style={{ height: 10 }} /> 
      <Button title="Stop Background Location" onPress={stopService} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BackgroundLocationScreen;