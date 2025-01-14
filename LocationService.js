import { NativeModules, Platform } from "react-native";

const { LocationServiceStarter } = NativeModules;

export const startLocationService = () => {
  if (Platform.OS === "android") {
    LocationServiceStarter.startService();
  }
};

export const stopLocationService = () => {
  if (Platform.OS === "android") {
    LocationServiceStarter.stopService();
  }
};