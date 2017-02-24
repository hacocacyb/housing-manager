var pg = require('pg');
var Pool = pg.Pool;
var url = require('url');


var env = process.env.NODE_ENV || 'development';
const useSSL = (env === 'production')

pg.defaults.ssl = useSSL;
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw('No DATABASE_URL is set in process.env');
}
const params = url.parse(databaseUrl);
const auth = params.auth.split(':');

const config = {
  user: auth[0],
  password: auth[1],
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  ssl: useSSL
};

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
