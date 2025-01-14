import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PushNotification from "react-native-push-notification";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

const MedicineReminder = () => {
  const [medicineName, setMedicineName] = useState("");
  const [medicineType, setMedicineType] = useState("tablet");
  const [dosage, setDosage] = useState("1");
  const [startTime, setStartTime] = useState(new Date());
  const [repeat, setRepeat] = useState("daily");
  const [remindAt, setRemindAt] = useState("exact time");
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startTime;
    setShowPicker(false); // Close picker after selection
    setStartTime(currentDate); // Update state with new selected time
  };

  PushNotification.createChannel(
    {
      channelId: "default-channel", // Must be a unique ID
      channelName: "Default Channel", // Channel name
      channelDescription: "A channel to categorize your notifications", // Description
      soundName: "default", // Optional: You can specify a sound
      importance: 4, // Set importance level (e.g., high)
      vibrate: true, // Enable vibration
    },
    (created) => console.log(`Create channel returned '${created}'`) // Log the result of channel creation
  );
  const saveReminder = async () => {
    if (!medicineName || !startTime) {
      Alert.alert("Error", "Please fill all required fields.");
      return;
    }

    const reminder = {
      medicineName,
      medicineType,
      dosage,
      startTime: startTime.toISOString(),
      repeat,
      remindAt,
    };

    try {
      // Save to local storage
      const existingReminders = JSON.parse(
        (await AsyncStorage.getItem("reminders")) || "[]"
      );
      await AsyncStorage.setItem(
        "reminders",
        JSON.stringify([...existingReminders, reminder])
      );

      // Schedule notification
      const reminderTime = new Date(startTime); // Clone the startTime
      if (remindAt === "5 minutes before") {
        reminderTime.setMinutes(reminderTime.getMinutes() - 5);
      } else if (remindAt === "15 minutes before") {
        reminderTime.setMinutes(reminderTime.getMinutes() - 15);
      }else{
        reminderTime.setMinutes(reminderTime.getMinutes());
      }

  
      PushNotification.localNotificationSchedule({
        channelId: "default-channel", // Use the channel ID you created
        message: `It's time to take your ${medicineName}!`,
        date: reminderTime,
        repeat:"time"
      });

      PushNotification.localNotification({
        channelId: "default-channel", // Use the channel ID you created
        message:`Test Notification scheduled for ${reminderTime}`, // Test message
      });

      // PushNotification.localNotificationSchedule({
      //   message: `It's time to take your ${medicineName}!`,
      // });


      Alert.alert("Success", "Reminder saved successfully!");
      // Reset form
      setMedicineName("");
      setMedicineType("tablet");
      setDosage("1");
      setStartTime(new Date());
      setRepeat("daily");
      setRemindAt("exact time");
    } catch (error) {
      console.error("Error saving reminder:", error);
      Alert.alert("Error", "Failed to save reminder.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Medicine Reminder</Text>

      <TextInput
        style={styles.input}
        placeholder="Medicine Name"
        value={medicineName}
        onChangeText={setMedicineName}
      />

      <Text style={styles.label}>Medicine Type:</Text>
      <Picker
        selectedValue={medicineType}
        onValueChange={(value) => setMedicineType(value)}
        style={styles.picker}
      >
        <Picker.Item label="Tablet" value="tablet" />
        <Picker.Item label="Syrup" value="syrup" />
      </Picker>

      <Text style={styles.label}>Dosage:</Text>
      <Picker
        selectedValue={dosage}
        onValueChange={(value) => setDosage(value)}
        style={styles.picker}
      >
        {medicineType === "tablet" ? (
          <>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
          </>
        ) : (
          <>
            <Picker.Item label="5 ml" value="5ml" />
            <Picker.Item label="10 ml" value="10ml" />
          </>
        )}
      </Picker>

      <Text style={styles.label}>Start Time:</Text>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.datePickerButton}
      >
        <Text style={styles.datePickerText}>
          {startTime.toLocaleString()}
        </Text>
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display={Platform.OS === "ios" ? "inline" : "default"}
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Repeat:</Text>
      <Picker
        selectedValue={repeat}
        onValueChange={(value) => setRepeat(value)}
        style={styles.picker}
      >
        <Picker.Item label="Daily" value="daily" />
        <Picker.Item label="After every 12 hours" value="12h" />
        <Picker.Item label="After every 6 hours" value="6h" />
        <Picker.Item label="After every 3 hours" value="3h" />
      </Picker>

      <Text style={styles.label}>Remind At:</Text>
      <Picker
        selectedValue={remindAt}
        onValueChange={(value) => setRemindAt(value)}
        style={styles.picker}
      >
        <Picker.Item label="Exact Time" value="exact time" />
        <Picker.Item label="5 Minutes Before" value="5 minutes before" />
        <Picker.Item label="15 Minutes Before" value="15 minutes before" />
      </Picker>

      <TouchableOpacity onPress={saveReminder} style={styles.button}>
        <Text style={styles.buttonText}>Save Reminder</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F5FCFF",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  picker: {
    height: 50,
    marginBottom: 20,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  datePickerText: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default MedicineReminder;