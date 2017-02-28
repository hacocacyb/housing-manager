var pg = require('pg');
var Pool = pg.Pool;
var url = require('url');


var env = process.env.NODE_ENV || 'development';
var config;


if (env === 'production') {
  let databaseUrl = process.env.DATABASE_URL;
  console.log('databaseUrl: ', databaseUrl)
  if (!databaseUrl) {
    throw('No DATABASE_URL is set in production environment: process.env');
  }
  let params = url.parse(databaseUrl);
  let auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: true
  };
  pg.defaults.ssl = true;
} else {
  //databaseUrl = 'postgresql://localhost:5432/Housing'
  config = {
    host: 'localhost',
    port: 5432,
    database: 'Housing'
  };
}

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
