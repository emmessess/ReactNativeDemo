import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'location.db',
    location: 'default',
  },
  () => {
    console.log('Database opened successfully');
  },
  (error) => {
    console.log('Error opening database: ', error);
  }
);

const LocationHistoryScreen = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = () => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM locations;`,
        [],
        (_, results) => {
          const rows = results.rows;
          let locationsArray = [];
          for (let i = 0; i < rows.length; i++) {
            locationsArray.push(rows.item(i));
          }
          setLocations(locationsArray);
        },
        (error) => {
          console.log('Error fetching locations: ', error);
        }
      );
    });

    // db.transaction((tx) => {
    //     tx.executeSql(
    //         `SELECT * FROM locations;`,
    //         [],
    //         (_, results) => {
    //             console.log('Locations fetched: ', results.rows.raw());
    //         },
    //         (error) => console.log('Error fetching locations: ', error),
    //     );
    // });
  };

  const renderLocation = ({ item }) => (
    <View style={styles.locationItem}>
      <Text>Latitude: {item.latitude}</Text>
      <Text>Longitude: {item.longitude}</Text>
      <Text>Timestamp: {item.timestamp}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
<Text style={headingStyle.heading}>
  Location Data Captured during Background Service
</Text>
      <FlatList
        data={locations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  locationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});
const headingStyle = StyleSheet.create({
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginVertical: 10,
    },
  });
  
export default LocationHistoryScreen;
