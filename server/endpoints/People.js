var { parseRequest } = require('../fn/httpHelpers.js');
var fs = require('fs');
var db = require('../models/index')

function decorateName(p) {
  let middle = p.middle ? ' ' + p.middle + ' ' : ' ';
  p.fullName = p.first + middle + p.last
}
function getAll(req, res, next) {
  const qry = fs.readFileSync('server/sql/getPeople.sql').toString();

  db.query(qry).spread((data, meta) => {
    data.forEach(decorateName)
    res.status(200).json(data)
  }).catch((err) => res.status(500).send(err))
}

function get(req, res, next) {
  let id = req.params.id;

  if (!id || id === 'undefined') {
    res.status(422).send('No id was included in request');
    return;
  }
  let qry = fs.readFileSync('server/sql/getPeople.sql').toString();
  qry += ' WHERE id = ' + id;
  db.query(qry).spread((data, meta) => {
    data.forEach(decorateName)
    if (data.length > 0) {
      data = data[0]
    }
    res.status(200).json(data)
  }).catch((err) => res.status(500).send(err))
}

function save(req, res, next) {
  parseRequest(req, function(params) {
    db.People.upsert(params).then(result => {
      res.status(200).json({
        success: true,
        msg: 'Person ' + result ? 'Created' : 'Updated'
      })
    }).catch(err => {
      res.status(500).json({
        succes: false,
        msg: err
      })
    })
  })
}

module.exports = {
  getAll: getAll,
  get: get,
  save: save
}
