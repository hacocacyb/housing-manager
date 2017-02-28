var Sequelize = require('sequelize')
var sequelize = null
var seedData = require('./seedData')


var env = process.env.NODE_ENV || 'development';
var config;
if (env === 'production') {
  let databaseUrl = process.env.DATABASE_URL;
  //console.log('databaseUrl: ', databaseUrl)
  if (!databaseUrl) {
    throw('No DATABASE_URL is set in production environment: process.env');
  }
  //let params = url.parse(databaseUrl);
  // let auth = params.auth.split(':');
  //
  // config = {
  //   user: auth[0],
  //   password: auth[1],
  //   host: params.hostname,
  //   port: params.port,
  //   database: params.pathname.split('/')[1],
  //   ssl: true
  // };
  sequelize = new Sequelize(databaseUrl)
  pg.defaults.ssl = true;
} else {
  console.log('**Trying to connect sequelize')
  sequelize = new Sequelize('postgres://localhost:5432/Housing', {
    dialect:  'postgres',
    protocol: 'postgres',
    database: 'Housing',
    port:     5432,
    host:     'localhost',
    logging: console.log
  })
  console.log("*** Made a sequelize db ")
}


sequelize
  .authenticate()
  .then(function(err) {
    console.log('Connection has been established successfully.');
  })
  .catch(function (err) {
    console.log('Unable to connect to the database:', err);
  });

let db = {
  sequelize: sequelize,
  query: function(qry) {
    return sequelize.query(qry);
  },
  Bed: sequelize.import(__dirname + '/bed'),
  BedType: sequelize.import(__dirname + '/bedType'),
  Building: sequelize.import(__dirname + '/building'),
  Payment: sequelize.import(__dirname + '/payment'),
  People : sequelize.import(__dirname + '/person'),
  RentalPeriod: sequelize.import(__dirname + '/rentalPeriod'),
  Visit: sequelize.import(__dirname + '/visit')
}

sequelize.sync({
  force: false
}).then(()=> {
  seedData(db)
})

module.exports = db;
