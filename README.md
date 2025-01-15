# **React Native Background Tracking App**

This is a **React Native** mobile application bootstrapped using the [`@react-native-community/cli`](https://github.com/react-native-community/cli). This project leverages native Android modules and advanced features like background services, local notifications, SQLite database, Google Maps, and sensor data to deliver a robust background tracking solution.

---

## **Getting Started**

### **Prerequisites**

1. Complete the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) till the **"Creating a new application"** step.
2. Ensure you have the following tools installed:
   - **Node.js**
   - **Yarn** or **npm**
   - **Android Studio** (for Android development)

---

## **Steps to Run the Project**

### **Step 1: Start the Metro Server**

Metro is the JavaScript _bundler_ used by React Native. Open your terminal and navigate to the project directory. Start Metro by running:

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

## **Features**

Background Location Tracking
	•	Uses native Android services (Kotlin) to capture user location even when the app is minimized.

	2.	SQLite Integration
	•	Stores location coordinates captured during background service execution in a local SQLite database for later use.

	3.	Local Notifications
	•	Schedules notifications to remind users of tasks, such as taking medicine, even when the app is killed.

	4.	Google Maps Integration
	•	Plots the user’s location path on Google Maps.
   
	5.	Sensor Data Tracking
	•	Captures data from the following sensors:
	•	Accelerometer
	•	Gyroscope
	•	Magnetometer
	•	Light Sensor
	•	Displays user activity (Stationary, Walking, or Running) based on sensor data.

## Roadmap

   •  Current Platform: Android
	•	Future Releases: Add support for iOS with equivalent functionality.
