import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import sensors from "react-native-sensors";

const THRESHOLDS = {
  stationary: { accelerometer: 0.2, gyroscope: 0.1 },
  walking: { accelerometer: 2.0, gyroscope: 0.5 },
  running: { accelerometer: 4.0, gyroscope: 1.5 },
};

const calculateMagnitude = ({ x, y, z }) => Math.sqrt(x ** 2 + y ** 2 + z ** 2);

const getActivity = (accelerometerMagnitude, gyroscopeMagnitude) => {
    console.log("Accelerometer Data:", accelerometerMagnitude);
    console.log("GyroscopeMagnitude Data:", gyroscopeMagnitude);

  if (
    accelerometerMagnitude < THRESHOLDS.stationary.accelerometer &&
    gyroscopeMagnitude < THRESHOLDS.stationary.gyroscope
  ) {
    return "Stationary";
  }
  if (
    accelerometerMagnitude < THRESHOLDS.walking.accelerometer &&
    gyroscopeMagnitude < THRESHOLDS.walking.gyroscope
  ) {
    return "Walking";
  }
  return "Running";
};

const ActivityTracking = () => {
  const [sensorData, setSensorData] = useState({});
  const [activity, setActivity] = useState("Stationary");
  const [duration, setDuration] = useState(0);

  const availableSensors = {
    accelerometer: ["x", "y", "z"],
    gyroscope: ["x", "y", "z"],
    magnetometer: ["x", "y", "z"],
    light: ["value"],
  };

  useEffect(() => {
    const subscriptions = {};

    // Subscribe to each sensor
    Object.keys(availableSensors).forEach((sensorName) => {
      if (sensors[sensorName]) {
        subscriptions[sensorName] = sensors[sensorName].subscribe(
          (data) => {
            setSensorData((prev) => ({ ...prev, [sensorName]: data }));
          },
          (error) => {
            console.error(`${sensorName} subscription error:`, error);
          }
        );
      }
    });

    return () => {
      // Unsubscribe from all sensors
      Object.values(subscriptions).forEach((sub) => sub && sub.unsubscribe());
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const accelerometerValues = sensorData.accelerometer || { x: 0, y: 0, z: 0 };
      const gyroscopeValues = sensorData.gyroscope || { x: 0, y: 0, z: 0 };

      const accelerometerMagnitude = calculateMagnitude(accelerometerValues);
      const gyroscopeMagnitude = calculateMagnitude(gyroscopeValues);

      const currentActivity = getActivity(accelerometerMagnitude, gyroscopeMagnitude);

      setActivity((prevActivity) => {
        if (prevActivity === currentActivity) {
          setDuration((prevDuration) => prevDuration + 1);
          return prevActivity;
        } else {
          setDuration(0); // Reset duration when activity changes
          return currentActivity;
        }
      });
    }, 300); // Update every second

    return () => clearInterval(interval);
  }, [sensorData]);

  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Activity Tracking</Text>
      <Text style={styles.activityText}>Activity: {activity}</Text>
      {/* <Text style={styles.durationText}>Duration: {duration} seconds</Text> */}

      {Object.entries(availableSensors).map(([sensorName, values]) => (
        <View key={sensorName} style={styles.sensorContainer}>
          <Text style={styles.sensorTitle}>{sensorName.toUpperCase()}</Text>
          {values.map((value) => (
            <Text key={value} style={styles.sensorText}>
              {value}: {sensorData[sensorName]?.[value]?.toFixed(2) || "N/A"}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  activityText: {
    fontSize: 20,
    marginVertical: 10,
    color: "#333",
  },
  durationText: {
    fontSize: 20,
    color: "#333",
  },
  sensorContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#eef",
    borderRadius: 8,
  },
  sensorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  sensorText: {
    fontSize: 16,
    color: "#555",
  },
});

export default ActivityTracking;