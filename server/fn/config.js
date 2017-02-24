var config = {
  development: {
    host: 'localhost',
    user: 'postgres',
    password: 'admin',
    database: 'Housing',
    schemaName: 'public',
    search_path: 'public',
    port: 5432
  },

  production: {
    host: 'housing.cotjve5wufyt.us-east-1.rds.amazonaws.com',
    user: 'eweiler',
    password: 'soberliving',
    database: 'housing',
    schemaName: 'public',
    search_path: 'public',
    port: 5432
  }
};

module.exports = config;
