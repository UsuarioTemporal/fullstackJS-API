/**
 * Cargando las variables de entorno desde el archivo .env
 */
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.disable('x-powered-by');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (process.env.API_DOC === "true") {
	const swaggerUi = require('swagger-ui-express');
  const YAML = require('yamljs');

  try {
    const swaggerDocument = YAML.load('./swagger.yaml');  
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  } catch (error) {
    console.error('No se a podido cargar la documentacion.');
  }
}

app.use('/auth', require('./routes/auth'));

// app.use(require('./middlewares/sesion-middleware'));

app.use('/api', require('./middlewares/sesion-middleware'), require('./routes/api'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.APP_ENV === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
