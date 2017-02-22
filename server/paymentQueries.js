var { query } = require('./query.js');
var { parseRequest } = require('./httpHelpers.js');
var qh = require('./queryHelpers.js');
var fs = require('fs');

const tableName = '"Payment"';

function getAll(req, res, next) {
  var getAllVisitsSql = fs.readFileSync('server/sql/getVisits.sql').toString();
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
  query('select * from '+tableName+' where '+tableName+'."VisitId" = $1', [id], function(err, data) {
    if (err) {
      res.status(500).send(err.message);
      return;
    } else {
      res.status(200).json({
        status: 'success',
        data: data.rows
      });
    }

  });
}

function save(req, res, next) {
  parseRequest(req, function(params) {
    let values = [params.Amount,params.PayDate, params.VisitId];
    let fields = ['Amount', 'PayDate', 'VisitId'];
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
            message: 'Payment added'
          })
        }
      });
    } else {
      let qry ='UPDATE '+tableName+' SET "PersonId"=$1, "BuildingId"=$2, ';
      qry += '"BedId"=$3, "Intake"=$4, "PayTypeId"=$5, "Cost"=$6 WHERE "Id" = $7';
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
