var mongoose = require('mongoose');

var Schema   = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var Patient = mongoose.model('Patient', new Schema({
  id:        ObjectId,
  firstName: String,
  lastName:  String,
  email:     { type: String, unique: true },
  patientId: { type: String, unique: true },
  profile:   String,
  drugs:     String,
  labs:      String
}));

module.exports = mongoose.model('Patient', Patient);