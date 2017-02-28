var { parseRequest } = require('../fn/httpHelpers')
var fs = require('fs')
var db = require('../models/index')

function getAllBeds(req, res) {
  var qry = fs.readFileSync('server/sql/getBeds.sql').toString();
  db.sequelize.query(qry).spread((beds, meta) => {
    console.log(beds.length);
    beds.forEach(function(b) {
      b.display = b.name + ' - ' + b.type;
      if (b.occupied) {
        b.display += ' (Occupied)'
      }
    })
    res.status(200).json(beds)
  }).catch(err => {
    res.status(500).json(err)
  })
}

function getBed(req, res, next) {
  let id = req.params.id;
  if (!id) {
    res.status(500).send('No id was included in request');
  }

  db.Bed.findById(id).then(data => {
    res.status(200).json(data)
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
