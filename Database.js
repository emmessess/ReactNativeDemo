import SQLite from 'react-native-sqlite-storage';

SQLite.DEBUG(true);
SQLite.enablePromise(true);

const database_name = "DemoProject.db";
const database_version = "1.0";
const database_displayname = "SQLite DemoProject Database";
const database_size = 200000;

let db;

export const initDatabase = async () => {
  db = await SQLite.openDatabase(
    database_name,
    database_version,
    database_displayname,
    database_size
  );
  await db.executeSql(
    "CREATE TABLE IF NOT EXISTS locations (id INTEGER PRIMARY KEY AUTOINCREMENT, latitude REAL, longitude REAL, timestamp TEXT)"
  );
  console.log("Database initialized");
};

export const saveLocation = async (latitude, longitude, timestamp) => {
  if (!db) await initDatabase();
  await db.executeSql(
    "INSERT INTO locations (latitude, longitude, timestamp) VALUES (?, ?, ?)",
    [latitude, longitude, timestamp]
  );
  console.log("Location saved:", latitude, longitude, timestamp);
};

export const getLocations = async () => {
  if (!db) await initDatabase();
  const [results] = await db.executeSql("SELECT * FROM locations");
  const locations = [];
  for (let i = 0; i < results.rows.length; i++) {
    locations.push(results.rows.item(i));
  }
  return locations;
};