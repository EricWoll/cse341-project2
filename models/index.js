const dbconfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.uri = dbconfig.uri;

/* 
    ADD models here:
    ex:
    db.model = require('./model.js')(mongoose); 
*/

module.exports = db;
