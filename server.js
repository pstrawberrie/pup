/**
 * Node Server
 */
const config = require('./config');
const path = require('path');
const chalk = require('chalk');
const express = require('express');
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');

const moment = require('moment');
const errorHandlers = require('./handlers/errorHandlers.js');
const siteLocals = require('./locals.js');

const connectDb = require('./db.js');

// Middlewares
app.use(helmet());
app.use(compression({}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Locals
app.use((req, res, next) => {
  res.locals.site = siteLocals;
  res.locals.m = moment;
  next();
});

// Configured Routes
app.use('/', routes);

// Error Handling Routes
app.use(errorHandlers.notFound);

if (app.get('env') === 'development') {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

// Start Server
connectDb().then(db => {
  console.log(chalk.yellow(`+++ DB Connected +++`));

  db.read()
  .then(() => {
    console.log(chalk.green(`+++ DB OK +++`));

    app.listen(config.webPort, () => {
      console.log(chalk.green(`+++ Web Server Started on localhost:${config.webPort} +++`));
    });
  });
})


