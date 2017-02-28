var { parseRequest } = require('../fn/httpHelpers.js');
var fs = require('fs');
var db = require('../models/index')

function getAll(req, res, next) {
  const qry = fs.readFileSync('server/sql/getPeople.sql').toString();
  db.query(qry).spread((data, meta) => {
    res.status(200).json(data)
  }).catch((err) => res.status(500).send(err))
}

function get(req, res, next) {
  let id = req.params.id;

  if (!id || id === 'undefined') {
    res.status(500).send('No id was included in request');
    return;
  }
  db.People.findById(id).then(data => {
    res.status(200).json(data)
  }).catch(err => res.status(500).send(err))
}

function save(req, res, next) {
  parseRequest(req, function(params) {
    db.People.upsert(params).then(result => {
      res.status(200).json(result)
    }).catch(err => {
      res.status(500).json(err)
    })
  })
}

module.exports = {
  getAll: getAll,
  get: get,
  save: save
}
