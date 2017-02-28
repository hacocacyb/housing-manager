var db = require('../models/index')

function getBedTypes(req, res) {
  db.BedType.findAll().then(data => {
    res.status(200).json(data);
  }).catch(err => res.status(500).send(err))
}

module.exports = {
  getBedTypes: getBedTypes
}
