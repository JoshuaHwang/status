var express    = require('express');
var path       = require('path');
var bcrypt     = require('bcryptjs');
// var csrf       = require('csurf');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var sessions   = require('client-sessions');
var User       = require('./users.js');

module.exports = function(app) {
  app.set('view engine', 'jade');
  app.locals.pretty = true;

  //-- Middleware
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(sessions({
    cookieName:     'session',
    secret:         'fhasd234fsebv267823r23',
    duration:       30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    httpOnly:       true, // Don't let browser js access cookies
    secure:         true, // Only use cookies over https
    ephemeral:      true // Delete cookie when browser closes
  }));

  // app.use(csrf());

  // Session 
  app.use(function(req, res, next) {
    if (req.session && req.session.user) {
      User.findOne({ email: req.session.user.email }, function(err, user) {
        if (user) {
          req.user = user;
          delete req.user.password;
          req.session.user = req.user;
        }
        next();
      });
    } else {
      next();
    }
  });

  function requireLogin(req, res, next) {
    if (!req.user) {
      res.redirect('/login'); 
    } else {
      next();
    }
  }

  //-- Routes
  app.get('/', function(req, res) {
    res.render('../template/jade/index.jade');
  });

  // Registration
  app.get('/register', function(req, res) {
    res.render('../template/jade/register.jade', { csrfToken: req.csrfToken() });
  });

  app.post('/register', function(req, res) {
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

    var user = new User({
      firstName: req.body.firstName,
      lastName:  req.body.lastName,
      email:     req.body.email,
      medId:     req.body.medId,
      password:  hash
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
    res.render('../template/jade/login.jade'); // , { csrfToken: req.csrfToken() }
  });

  app.post('/login', function(req, res) {
    User.findOne({ email: req.body.email }, function(err, user) {
      if (!user) {
        res.render('../template/jade/login.jade', { error: 'Invalid email or password.' });
        console.log('Invalid email or password.');
      } else {
        if (bcrypt.compareSync(req.body.password, user.password) && req.body.medId === user.medId) {
          req.session.user = user;
          res.redirect('/dashboard');
          console.log(user.email + ' has logged in!');
        } else {
          res.render('../template/jade/login.jade', { error: 'Invalid email or password.' });
          console.log('Invalid email or password.');
        }
      }
    });
  });

  app.get('/dashboard', requireLogin, function(req, res) {
    res.render('../template/jade/dashboard.jade');
  });

  app.get('/logout', function(req, res) {
    req.session.reset(); // Reset the session
    res.redirect('/');
    console.log(req.user.email + ' has logged out!');
  });
};