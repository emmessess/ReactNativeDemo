import React from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Title } from "react-native-paper";

const HomeScreen = ({ navigation }) => {
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Activity Tracking</Title>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigateTo("ActivityTracking")}>
            Go
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Medicine Reminder</Title>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigateTo("MedicineReminder")}>
            Go
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Title>Location</Title>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigateTo("Location")}>
            Go
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Background Location</Title>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigateTo("BackgroundLocationScreen")}>
            Go
          </Button>
        </Card.Actions>
      </Card>
      <Card style={styles.card}>
        <Card.Content>
          <Title>Data History</Title>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => navigateTo("DataHistoryScreen")}>
            Go
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    padding: 16,
  },
  card: {
    width: "100%",
    marginVertical: 10,
    borderRadius: 8,
  },
});