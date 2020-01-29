/**
 * Routes
 */
const express = require('express');
const router = express.Router();

/**
 * Require Handlers & Controllers
 */
const { catchErrors } = require('./handlers/errorHandlers');
const indexController = require('./controllers/indexController');
const scheduleController = require('./controllers/scheduleController');

/**
 * Index Routing
 */
router.get('/', catchErrors(indexController.index));//GET Index

/**
 * Schedule Routing
 */
router.get('/api/schedule', catchErrors(scheduleController.getSchedule));//GET Schedule (get all)
router.post('/api/schedule', scheduleController.postSchedule);//POST Schedule (new object)

// Export Router
module.exports = router;
