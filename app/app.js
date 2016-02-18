var express    = require('express');
var app        = express();
var path       = require('path');
var bodyParser = require('body-parser');

var port = process.env.PORT || 1337;

app.listen(port);
console.log(port + ' is the magic port!');

app.set('view engine', 'jade');
app.locals.pretty = true;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', function(req, res) {
  res.render('../template/jade/index.jade');
});

app.get('/register', function(req, res) {
  res.render('../template/jade/register.jade');
});

app.post('/register', function(req, res) {
  res.json(req.body);
});

app.get('/login', function(req, res) {
  res.render('../template/jade/login.jade');
});

app.post('/login', function(req, res) {
  res.json(req.body);
});

app.get('/dashboard', function(req, res) {
  res.render('../template/jade/dashboard.jade');
});

app.get('/logout', function(req, res) {
  res.redirect('/');
});