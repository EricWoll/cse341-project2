const dbconfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.uri = dbconfig.uri;

db.animals = require('./animals')(mongoose); // 5 props
db.households = require('./households')(mongoose); // 7 props
db.adoption_records = require('./adoption_records')(mongoose); // 4 props

module.exports = db;
