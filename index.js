// DEBUG=app:* nodemon
const debug = require('debug')('app:startup');
const config = require('config');
const helmet = require('helmet'); // Helps secure your apps by setting various HTTP headers.
const morgan = require('morgan'); // HTTP request logger
const logger  = require('./middleware/logger');
const courses = require('./routes/courses');
const home = require('./routes/home');
const authentication = require('./authentication');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // default

// Environment
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`app: ${app.get('env')}`);

app.use(express.json()); // req.body
app.use(express.urlencoded({ extended: true })); // key1=value1&key2=value2
app.use(express.static('public')); // localhost/readme.txt
app.use(helmet()); // https://github.com/helmetjs/helmet
app.use('/api/courses', courses);
app.use('/', home);
// app.use(morgan('tiny')); // https://expressjs.com/en/resources/middleware/morgan.html

// Configuration
console.log('Application Name:  ' + config.get('name'));
console.log('Mail Server:  ' + config.get('mail.host'));
console.log('Mail Password:  ' + config.get('mail.passowrd'));

if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
  debug('Morgan enabled...');
}

app.use(logger);
app.use(authentication);

// PORT: export PORT=xxxx in terminal
const port = process.env.PORT || 3001;
app.listen(port, () => { console.log(`Listening on port ${port}...`); });
