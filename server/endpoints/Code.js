var { queryToResponse } = require('../fn/query.js');

function getBedTypes(req, res) {
  query(res, 'select * from "BedType"')
}

module.exports = {
  getBedTypes: getBedTypes
}
