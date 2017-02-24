var { queryToResponse } = require('../fn/query.js');

function getBedTypes(req, res) {
  queryToResponse(res, 'select * from "BedType"')
}

module.exports = {
  getBedTypes: getBedTypes
}
