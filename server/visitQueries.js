var { query, queryToResponse } = require('./query.js');
var { parseRequest } = require('./httpHelpers.js');
var qh = require('./queryHelpers.js');
var fs = require('fs');

const tableName = '"Visit"';

function getAll(req, res, next) {
  var getAllVisitsSql = fs.readFileSync('server/sql/getVisits.sql').toString();
  queryToResponse(res, getAllVisitsSql)
}

function get(req, res, next) {
  let id = req.params.id;

  if (!id || id === 'undefined') {
    res.status(500).send('No id was included in request');
    return;
  }
  queryToResponse(res, 'select * from '+tableName+' where '+tableName+'."Id" = $1', [id]);
}

function save(req, res, next) {
  parseRequest(req, function(params) {
    let values = [params.PersonId,params.BuildingId, params.BedId, params.Intake, params.PayTypeId, params.Cost];
    let fields = ['PersonId', 'BuildingId', 'BedId', 'Intake', 'PayTypeId', 'Cost'];
    let fieldsString = '"' + fields.join('","') + '"';

    if (params.Id === undefined || params.Id === null) {
      queryToResponse(res, {
        text: 'INSERT INTO '+tableName+'(' + fieldsString + ') VALUES (' + qh.dollarString(fields.length) + ')',
        values: values
      });
    } else {
      let qry ='UPDATE '+tableName+' SET "PersonId"=$1, "BuildingId"=$2, ';
      qry += '"BedId"=$3, "Intake"=$4, "PayTypeId"=$5, "Cost"=$6 WHERE "Id" = $7';
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
