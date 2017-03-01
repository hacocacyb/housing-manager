var { parseRequest } = require('../fn/httpHelpers.js');
var fs = require('fs');
var db = require('../models/index')

function getAll(req, res, next) {
  var qry = fs.readFileSync('server/sql/getBuildings.sql').toString();
  db.sequelize.query(qry).spread((data, meta) => {
    res.status(200).json(data)
  }).catch((a, b, c) => {
    res.status(500).json()
  })
}

function get(req, res, next) {
  let id = req.params.id;
  if (!id) {
    res.error('No id was included in request');
  }
  db.Building.findById(id).then(data => {
    res.status(200).json(data)
  }).catch(err => res.status(500).send(err))
}

function save(req, res, next) {
  parseRequest(req, function(params) {
    db.Building.upsert(params).then(result => {
      res.status(200).json({
        success: true,
        msg: 'Record ' + result ? 'Created' : 'Updated'
      })
    }).catch(err => {
      res.status(500).json({
        success: false,
        msg: error
      })
    })
  })
}
module.exports = {
  getAll: getAll,
  get: get,
  save: save
}
