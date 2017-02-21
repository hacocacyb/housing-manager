var { query } = require('./query.js');

function getBedTypes(req, res, next) {
  query('select * from "BedType"', function(response, data) {
      res.status(200)
        .json({
          status: 'success',
          data: data.rows,
          message: 'Retrieved all Bed Types'
        });
    })
}

module.exports = {
  getBedTypes: getBedTypes
}
