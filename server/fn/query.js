var Pool = require('pg').Pool;
var fs = require('fs');

var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

pool = new Pool(config);

module.exports = {
  query: function(q, v, cb) {
    pool.query(q, v, cb);
  },
  queryToResponse: function(res, q, v) {
    pool.query(q, v, function(err, resp) {
      if (err) {
        res.status(500).json({
          success: false,
          msg: err.message
        });
      } else {
        res.status(200);
        res.json({
          success: true,
          data: resp.rows
        });
      }
    })
  }
}
