var Pool = require('pg').Pool;
var fs = require('fs');

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

pool = new Pool(config);

module.exports = {
  query: function(q, v, cb) {
    pool.query(q, v, cb);
  }
}
