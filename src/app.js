'use strict';

// 3rd Party Resources
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Esoteric Resources
const errorHandler = require( './middleware/500.js');
const notFound = require( './middleware/404.js' );
const authRouter = require( './auth/router.js' );

//new from today!
const playRouters = require('./routes/play.js');


// Prepare the express app
const app = express();

// App Level MW
app.use(cors());
// morgan let us formats the logs for us, we are using a dev formatting instead of a "common" one 
app.use(morgan('dev'));
// these are all curried fns!
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(playRouters);

// Routes
app.use(authRouter);

// Catchalls
app.use(notFound);
app.use(errorHandler);

let isRunning = false;

module.exports = {
  server: app,
  start: (port) => {
    if( ! isRunning ) {
      app.listen(port, () => {
        isRunning = true;
        console.log(`Server Up on ${port}`);
      });
    }
    else {
      console.log('Server is already running');
    }
  },
};
