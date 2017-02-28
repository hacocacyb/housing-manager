var { parseRequest } = require('../fn/httpHelpers.js');
var fs = require('fs');
var db = require('../models/index.js')

function getWidgetInfo(req, res) {
  const queryLoc = 'server/sql/getBillingWidget.sql'
  const getBillingSql = fs.readFileSync(queryLoc).toString()
  db.query(getBillingSql).spread((data, meta) => {
    const result = data.map((r) => {
      r.pastDue = Math.max(r.dueBilled - r.payments, 0);
      return r;
    }).sort((a, b) => b.pastDue - a.pastDue)

    res.status(200);
    res.json(data);
  })
}

function getPaymentsByVisitId(req, res, next) {
  let id = req.params.id;

  if (!id || id === 'undefined') {
    res.status(500).send('No id was included in request');
    return;
  }
  db.Payment.findAll({
    where: {
      visitId: id
    }
  }).then(data => {
    res.status(200).json(data)
  }).catch(err => res.status(500).send(err))
}

function save(req, res, next) {
  parseRequest(req, function(params) {
    db.Payment.upsert(params).then(result => {
      res.status(200).json({
        success: true,
        data: result
      })
    }).catch(err => {
      res.status(500).json({
        success: false,
        msg: err.toString()
      })
    })
  })
}

module.exports = {
  get: getPaymentsByVisitId,
  getWidgetInfo: getWidgetInfo,
  save: save
}
