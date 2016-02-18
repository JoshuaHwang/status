var mongoose = require('mongoose');

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

module.exports = mongoose.model('User', User);