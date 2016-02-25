var express    = require('express');
var app        = express();
var path       = require('path');
var bcrypt     = require('bcryptjs');
var csrf       = require('csurf');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var sessions   = require('client-sessions');

mongoose.connect('mongodb://localhost/status');

app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

require('./routes/routes.js')(app);
require('./routes/patient-route.js')(app);

var port = process.env.PORT || 1337;

app.listen(port);
console.log(port + ' is the magic port!');