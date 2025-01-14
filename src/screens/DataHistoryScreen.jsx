import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const DataHistoryScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Go to Location History"
        onPress={() => navigation.navigate('LocationHistoryScreen')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DataHistoryScreen;