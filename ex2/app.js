var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var axios = require('axios')
var indexRouter = require('./routes/index');

var app = express();

var url = "http://clav-api.di.uminho.pt/v2/classes"

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: url
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var api = "http://clav-api.di.uminho.pt/v2"
var username = "pri2020@teste.uminho.pt"
var password = "123"
var token = ""

app.use(function (req,res, next){
  axios.post(api + "/users/login", {"username": username, "password": password})
    .then(dados => {
      console.log(dados)
      token = dados.data.token
      console.log('Token: ' + token + '\n\n')
      instance.defaults.headers.common['Authorization'] = token;
      next()
    })
    .catch(e => console.log('Erro: não consegui obter o token ' + e))
})


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
