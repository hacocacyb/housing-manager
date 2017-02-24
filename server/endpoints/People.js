var { query, queryToResponse } = require('../fn/query.js');
var { parseRequest } = require('../fn/httpHelpers.js');
var qh = require('../fn/queryHelpers.js');
var fs = require('fs');

const tableName = '"Person"';

function getAll(req, res, next) {
  const qry = fs.readFileSync('server/sql/getPeople.sql').toString();

  queryToResponse(res, qry);
}

function get(req, res, next) {
  let id = req.params.id;

  if (!id || id === 'undefined') {
    res.status(500).send('No id was included in request');
    return;
  }
  queryToResponse(res, 'select * from '+tableName+' where "Person"."Id" = $1', [id]);
}

function save(req, res, next) {
  parseRequest(req, function(params) {
    let fields = ['First', 'Last', 'Middle', 'Phone', 'Dob'];
    let values = fields.map(fieldName => params[fieldName]);
    let fieldsString = qh.fieldString(fields);

    if (params.Id === undefined || params.Id === null) {
      queryToResponse(res, {
        text: 'INSERT INTO '+tableName+'(' + fieldsString + ') VALUES (' + qh.dollarString(fields.length) + ')',
        values: values
      });
    } else {
      let qry ='UPDATE '+tableName+' SET "First"=$1, "Last"=$2, ';
      qry += '"Middle"=$3, "Phone"=$4, "Dob"=$5 WHERE "Id" = $6';
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
