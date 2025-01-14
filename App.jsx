import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import ActivityTracking from "./ActivityTracking";
import MedicineReminder from "./MedicineReminder";
import Location from "./Location";
import BackgroundLocationScreen from "./BackgroundLocationScreen";
import DataHistoryScreen from "./DataHistoryScreen";
import LocationHistoryScreen from "./LocationHistoryScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ActivityTracking" component={ActivityTracking} />
        <Stack.Screen name="MedicineReminder" component={MedicineReminder} />
        <Stack.Screen name="Location" component={Location} />
        <Stack.Screen name="BackgroundLocationScreen" component={BackgroundLocationScreen} />
        <Stack.Screen name="DataHistoryScreen" component={DataHistoryScreen} />
        <Stack.Screen name="LocationHistoryScreen" component={LocationHistoryScreen} />
 </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;