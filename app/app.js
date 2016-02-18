var express    = require('express');
var app        = express();
var path       = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var sessions   = require('client-sessions');

mongoose.connect('mongodb://localhost/status');

var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var User = mongoose.model('User', new Schema({
  id:        ObjectId,
  firstName: String,
  lastName:  String,
  email:     { type: String, unique: true },
  medId:     { type: String, unique: true },
  password:  String
}));

app.set('view engine', 'jade');
app.locals.pretty = true;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(sessions({
  cookieName:     'session',
  secret:         'fhasd234fsebv267823r23',
  duration:       30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000
}));

app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

//-- Routes
app.get('/', function(req, res) {
  res.render('../template/jade/index.jade');
});

// Registration
app.get('/register', function(req, res) {
  res.render('../template/jade/register.jade');
});

app.post('/register', function(req, res) {
  var user = new User({
    firstName: req.body.firstName,
    lastName:  req.body.lastName,
    email:     req.body.email,
    medId:     req.body.medId,
    password:  req.body.password
  });

  user.save(function(err) {
    if (err) {
      var err = 'Something bad happened, try again!';
      if (err.code === 11000) {
        var error = 'That email is already taken, try again!';
      }
      res.render('../template/jade/register.jade', { error: error });
    } else {
      res.redirect('/dashboard');
    }
  });
});

// Login
app.get('/login', function(req, res) {
  res.render('../template/jade/login.jade');
});

app.post('/login', function(req, res) {
  User.findOne({ email: req.body.email }, function(err, user) {
    if (!user) {
      res.render('../template/jade/login.jade', { error: 'Invalid email or password.' });
      console.log('Invalid email or password.');
    } else {
      if (req.body.password === user.password && req.body.medId === user.medId) {
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        res.render('../template/jade/login.jade', { error: 'Invalid email or password.' });
        console.log('Invalid email or password.');
      }
    }
  });
});

app.get('/dashboard', function(req, res) {
  if (req.session && req.session.user) {
    User.findOne({ email: req.session.user.email }, function(err, user) {
      if (!user) {
        req.session.reset(); // Reset the session
        res.redirect('/login');
      } else {
        res.render('../template/jade/dashboard.jade');
      }
    });
  } else {
    res.redirect('/login');
  }
});

app.get('/logout', function(req, res) {
  req.session.reset(); // Reset the session
  res.redirect('/');
});

var port = process.env.PORT || 1337;

app.listen(port);
console.log(port + ' is the magic port!');