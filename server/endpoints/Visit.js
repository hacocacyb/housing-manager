var { parseRequest } = require('../fn/httpHelpers.js');
var fs = require('fs');
var db = require('../models/index')
function addMetaFields(v) {
  v.display = v.first + ' ' + v.last + ' (' + v.buildingName + ')'
}
function getAll(req, res, next) {
  var getAllVisitsSql = fs.readFileSync('server/sql/getVisits.sql').toString();
  db.query(getAllVisitsSql).spread((data, meta) => {
    data.forEach(addMetaFields);
    res.status(200).json(data);
  })
}

function get(req, res, next) {
  let id = req.params.id;

  if (!id || id === 'undefined') {
    res.status(500).send('No id was included in request');
    return;
  }

  db.Visit.findById(id).then(data => {
    res.status(200).json(data)
  })
}

function save(req, res, next) {
  parseRequest(req, function(params) {
    db.Visit.upsert(params).then(result => {
      res.status(200).json({ success: true })
    }).catch((err, b, c) => {
      res.status(500).json({ success: false, msg: err.toString() })
    })
  })

}
module.exports = {
  getAll: getAll,
  get: get,
  save: save
}
