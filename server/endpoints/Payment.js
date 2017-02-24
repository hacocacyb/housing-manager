var { query, queryToResponse } = require('../fn/query.js');
var { parseRequest } = require('../fn/httpHelpers.js');
var qh = require('../fn/queryHelpers.js');
var fs = require('fs');

const tableName = '"Payment"';


function getWidgetInfo(req, res) {
    var getBillingSql = fs.readFileSync('server/sql/getBillingWidget.sql').toString()
    query(getBillingSql, (err, response) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        const result = response.rows.map((r) => {
          r.PastDue = Math.max(r.DueBilled - r.Payments, 0);
          return r;
        }).sort((a,b) => b.PastDue - a.PastDue)
        res.status(200);
        res.json({
          status: 'success',
          data: result
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
  queryToResponse(res, 'select * from '+tableName+' where '+tableName+'."VisitId" = $1', [id]);
}

function save(req, res, next) {
  parseRequest(req, function(params) {
    let values = [params.Amount,params.PayDate, params.VisitId]
    let fields = ['Amount', 'PayDate', 'VisitId']
    let fieldsString = qh.fieldString(fields)

    if (params.Id === undefined || params.Id === null) {
      queryToResponse(res, {
        text: 'INSERT INTO '+tableName+'(' + fieldsString + ') VALUES (' + qh.dollarString(fields.length) + ')',
        values: values
      })
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
  get: get,
  getWidgetInfo: getWidgetInfo,
  save: save
}
