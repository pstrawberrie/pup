/**
 * DB Schedule Collection Helpers
 */
const connectDb = require('../db');
const shortid = require('shortid');

// Return Full Schedule Collection
exports.getCollection = () => new Promise((resolve, reject) => {
  connectDb().then(db => {
    const collection = db.defaults({ schedule: [] })
    .get('schedule')
    .sortBy('date')
    .value();

    resolve(collection);
  });
});

// Post New Object To Schedule Collection
exports.pushToCollection = (newObj) => new Promise((resolve, reject) => {
  // Validate New Schedule Object
  if(!newObj) return reject('Nothing passed to pushToCollection');
  if(typeof newObj !== 'object') return reject('Schedule Item is not an object');
  if(!newObj.datetime) return reject('datetime is required');
  if(!newObj.timezone) return reject('timezone is required');
  newObj.id = shortid.generate();

  // Write to DB, Resolve Promise
  connectDb().then(db => {
    db.get('schedule')
    .push(newObj)
    .write()
    .id;

    resolve();
  });
});
