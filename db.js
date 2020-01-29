/**
 * Database
 */
const config = require('./config.js');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const adapter = new FileAsync(config.dbFile);

function connectDb() {
  return new Promise((resolve, reject) => {
    low(adapter)
    .then(db => resolve(db))
    .catch(err => reject(err));
  });
}

module.exports = connectDb;
