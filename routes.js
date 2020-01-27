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

/**
 * Index Routing
 */
router.get('/', catchErrors(indexController.index));

module.exports = router;
