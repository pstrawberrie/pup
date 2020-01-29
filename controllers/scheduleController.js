/**
 * Schedule Controller
 */
const chalk = require('chalk');
const scheduleCollection = require('../lib/scheduleCollection');

//GET Schedule
exports.getSchedule = async (req, res) => {
  const schedule = await scheduleCollection.getCollection();
  console.log('GOT SCHEDULE:', schedule);//REMOVE
  res.json(schedule);
}

// POST New Schedule Item
exports.postSchedule = (req, res) => {
  console.log('POST schedule item:');//REMOVE
  console.log(req.body);//REMOVE

  scheduleCollection.pushToCollection(req.body)
  .then(() => res.sendStatus(200))
  .catch((err) => {console.log(err); res.sendStatus(500)});
}
