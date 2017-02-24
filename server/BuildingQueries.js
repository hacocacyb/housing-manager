var { query, queryToResponse } = require('./query.js');
var { parseRequest } = require('./httpHelpers.js');
var fs = require('fs');

function getAll(req, res, next) {
  var sql = fs.readFileSync('server/sql/getBuildings.sql').toString();

  queryToResponse(res, sql)
}

function get(req, res, next) {
  let id = req.params.id;
  if (!id) {
    res.error('No id was included in request');
  }
  queryToResponse(res, 'select * from "Building" where "Building"."Id" = $1', [id]);
}

function save(req, res, next) {

  parseRequest(req, function(params) {
    let values = [params.Name,params.Addr1, params.Addr2, params.City, params.State, params.Zip];
    let fields = ['Name', 'Addr1', 'Addr2', 'City', 'State', 'Zip'];
    let fieldsString = qh.fieldsString(fields);
    let dollarString = qh.dollarString(fields.length);

    if (params.Id === undefined || params.Id === null) {
      queryToResponse(res, {
        text: 'INSERT INTO "Building"(' + fieldsString + ') VALUES (' + dollarString + ')',
        values: values
      });
    } else {
      let qry ='UPDATE "Building" SET "Name"=$1, "Addr1"=$2, ';
      qry += '"Addr2"=$3, "City"=$4,	"State"=$5, "Zip"=$6 WHERE "Id" = $7';
      values.push(params.Id);

      queryToResponse(res, {
        text: qry,
        values: values
      })
    }
  })

}
module.exports = {
  getAll: getAll,
  get: get,
  save: save
}
