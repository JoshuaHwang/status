var express    = require('express');
var path       = require('path');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var sessions   = require('client-sessions');
var Patient    = require('./patients.js');

module.exports = function(app) {
  app.set('view engine', 'jade');
  app.locals.pretty = true;

  //-- Middleware
  app.use(bodyParser.urlencoded({ extended: true }));

  //-- Routes
  app.post('/patients', function(req, res) {
    var patient = new Patient({
      firstName: req.body.firstName,
      lastName:  req.body.firstName,
      patientId: req.body.patientId,
      profile:   req.body.profile,
      drugs:     req.body.drugs,
      labs:      req.body.labs,
    });

    patient.save(function(err) {
      if (err) {
        var err = 'Something bad happened, try again!';
        res.render('../template/jade/dashboard.jade', { error: error });
      } else {
        res.redirect('/dashboard');
      }
    });
  });
};