var express = require('express');
var app     = express();
var path    = require('path');

var port = process.env.PORT || 1337;

app.listen(port);
console.log(port + ' is the magic port!');

app.use(express.static('public'));
app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});