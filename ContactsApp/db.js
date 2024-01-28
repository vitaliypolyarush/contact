import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('contacts.db');

db.transaction(tx => {
  tx.executeSql(
    'CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, phone TEXT);'
  );
});

export default db;
