const sqlite3 = require('sqlite3').verbose();
const DB_PATH = './database.db';

let db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error(err.message);
    throw err;
  } else {
    console.log('Connected to the SQLite database.');
    db.run("PRAGMA foreign_keys = ON", err => {
      if (err) {
        console.error("Error enabling foreign key constraints:", err.message);
      } else {
        console.log("Foreign key constraints enabled.");
      }
    });
  }
});

module.exports = db;
