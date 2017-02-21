var { query } = require('./query.js');
var { parseRequest } = require('./httpHelpers.js');
var qh = require('./queryHelpers.js');
var fs = require('fs');

const tableName = '"Visit"';

function getAll(req, res, next) {
  var getAllVisitsSql = fs.readFileSync('./sql/getVisits.sql').toString();
  query(getAllVisitsSql, (err, response) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200);
      res.json({
        status: 'success',
        data: response.rows,
        message: 'Retrieved all Visits'
      });
    }
  })
}

function get(req, res, next) {
  let id = req.params.id;

  if (!id || id === 'undefined') {
    res.status(500).send('No id was included in request');
    return;
  }
  query('select * from '+tableName+' where '+tableName+'."Id" = $1', [id], function(err, data) {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    let row = {};
    if (data.rows.length > 0) {
      row = data.rows[0];
    }
    res.status(200).json({
      status: 'success',
      data: data.rows[0]
    });
  });
}

function save(req, res, next) {
  parseRequest(req, function(params) {
    let values = [params.PersonId,params.BuildingId, params.BedId, params.Intake, params.PayTypeId];
    let fields = ['PersonId', 'BuildingId', 'BedId', 'Intake', 'PayTypeId'];
    let fieldsString = '"' + fields.join('","') + '"';

    if (params.Id === undefined || params.Id === null) {
      console.log('INSERT INTO '+tableName+'(' + fieldsString + ') VALUES (' + qh.dollarString(fields.length) + ')');
      query({
        text: 'INSERT INTO '+tableName+'(' + fieldsString + ') VALUES (' + qh.dollarString(fields.length) + ')',
        values: values
      }, function(err, data) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json({
            success: true,
            message: 'Visit added'
          })
        }
      });
    } else {
      let qry ='UPDATE '+tableName+' SET "PersonId"=$1, "BuildingId"=$2, ';
      qry += '"BedId"=$3, "Intake"=$4 "PayTypeId"=$5 WHERE "Id" = $6';
      values.push(params.Id);
      query({
        text: qry,
        values: values
      }, function(err, response) {
        if (err) {
          res.status(500).json({
            success: false,
            error: err.message
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Visit Updated'
          })
        }
      })
    }


  })

}
module.exports = {
  getAll: getAll,
  get: get,
  save: save
}
