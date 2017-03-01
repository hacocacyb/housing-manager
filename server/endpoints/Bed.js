var { parseRequest } = require('../fn/httpHelpers')
var fs = require('fs')
var db = require('../models/index')

function decorateBeds(data) {
  data.forEach(function(b) {
    b.display = b.name + ' - ' + b.type;
    if (b.occupied) {
      b.display += ' (Occupied)'
    }
  })
}

function getAllBeds(req, res) {
  var qry = fs.readFileSync('server/sql/getBeds.sql').toString();
  db.query(qry).spread((beds, meta) => {
    decorateBeds(beds)
    res.status(200).json(beds)
  }).catch(err => {
    res.status(500).json(err)
  })
}

function getBed(req, res, next) {
  let id = req.params.id;
  if (!id) {
    res.status(422).send('No id was included in request');
  }

  var qry = fs.readFileSync('server/sql/getBeds.sql').toString();
  qry += ' WHERE b.id=' + id;
  db.query(qry).spread((beds, meta) => {
    decorateBeds(beds)
    if (beds.length > 0) {
      beds = beds[0]
    }
    res.status(200).json(beds)
  }).catch(err => {
    res.status(500).json(err)
  })
}

function saveBed(req, res, next) {
  parseRequest(req, function(params) {
    db.Bed.upsert(params).then(result => {
      res.status(200).json(result)
    }).catch(err => {
      res.status(500).json(err)
    })
  })
}

module.exports = {
  getAllBeds: getAllBeds,
  getBed: getBed,
  saveBed: saveBed
}
