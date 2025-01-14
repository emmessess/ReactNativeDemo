import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button, PermissionsAndroid, Platform, ToastAndroid } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import { initDatabase, saveLocation, getLocations } from "./Database";

const App = () => {
  const [locations, setLocations] = useState([]);
  const [path, setPath] = useState([]);

  // Request location permissions
  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
        ]);

        if (
          granted["android.permission.ACCESS_FINE_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED &&
          granted["android.permission.ACCESS_BACKGROUND_LOCATION"] === PermissionsAndroid.RESULTS.GRANTED
        ) {
          ToastAndroid.show("Location permissions granted", ToastAndroid.SHORT);
        } else {
          ToastAndroid.show("Location permissions denied", ToastAndroid.SHORT);
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  // Start foreground service
  const startForegroundService = () => {
    ReactNativeForegroundService.addTask(() => {
      console.log("Foreground Service Running...");
    });

    ReactNativeForegroundService.start({
      id: 1,
      title: "Location Tracking",
      message: "Tracking location in the background",
    });
  };

  // Start location updates
  const startLocationUpdates = () => {
    Geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const timestamp = new Date().toISOString();
        console.log("Position:", latitude, longitude, timestamp);

        // Save to SQLite
        await saveLocation(latitude, longitude, timestamp);

        // Update state for rendering
        setPath((prevPath) => [...prevPath, { latitude, longitude }]);
      },
      (error) => {
        console.error("Location error:", error);
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 10000, // Milliseconds
        fastestInterval: 5000, // Milliseconds
        showsBackgroundLocationIndicator: true,
      }
    );
  };

  // Load saved locations from SQLite
  const loadSavedLocations = async () => {
    const savedLocations = await getLocations();
    setLocations(savedLocations);
    const newPath = savedLocations.map((loc) => ({
      latitude: loc.latitude,
      longitude: loc.longitude,
    }));
    setPath(newPath);
  };

  useEffect(() => {
    const setup = async () => {
      await requestLocationPermission();
      await initDatabase();
      loadSavedLocations();
    };
    setup();

    return () => {
      ReactNativeForegroundService.stop();
      Geolocation.stopObserving();
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: path.length > 0 ? path[0].latitude : 37.78825,
          longitude: path.length > 0 ? path[0].longitude : -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {path.length > 0 && <Polyline coordinates={path} strokeWidth={5} strokeColor="blue" />}
        {path.map((loc, index) => (
          <Marker key={index} coordinate={loc} />
        ))}
      </MapView>
      <Button title="Start Location Tracking" onPress={startLocationUpdates} />
      <Button title="Load Saved Locations" onPress={loadSavedLocations} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default App;