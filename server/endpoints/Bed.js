var { queryToResponse } = require('../fn/query.js');
var { parseRequest } = require('../fn/httpHelpers.js');
var fs = require('fs');

function getAllBeds(req, res) {
  var qry = fs.readFileSync('server/sql/getBeds.sql').toString();

  queryToResponse(res, qry)
}

function getBed(req, res, next) {
  let id = req.params.id;
  if (!id) {
    res.error('No id was included in request');
  }
  queryToResponse(res, 'select * from "Bed" where "Bed"."Id" = $1', [id])
}

function saveBed(req, res, next) {
  parseRequest(req, function(params) {
    let values = [params.TypeId,params.RoomId, params.BuildingId, params.Name];
    if (params.Id === undefined || params.Id === null) {
      let qry = 'INSERT INTO "Bed"("TypeId", "RoomId", "BuildingId", "Name") VALUES ($1, $2, $3, $4);';
      queryToResponse(res, qry, values)
    } else {
      values.push(params.Id);
      let qry = 'UPDATE "Bed" SET "TypeId"=$1, "RoomId"=$2, "BuildingId"=$3, "Name"=$4	WHERE "Id" = $5';
      queryToResponse(res, qry, values)
    }
  })
}

module.exports = {
  getAllBeds: getAllBeds,
  getBed: getBed,
  saveBed: saveBed
}
