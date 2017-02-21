var { query } = require('./query.js');
var fs = require('fs');

function getAllBeds(req, res, next) {
  var qry = fs.readFileSync('./sql/getBeds.sql').toString();

  query(qry, function(err, data) {
    if (err) {
      res.status(200).json({
        status: 'error',
        message: err
      })
    } else {
      res.status(200)
        .json({
          status: 'success',
          data: data.rows,
          message: 'Retrieved all Beds'
        });
    }

  })
}

function getBed(req, res, next) {
  let id = req.params.id;
  if (!id) {
    res.error('No id was included in request');
  }
  query('select * from "Bed" where "Bed"."Id" = $1', [id], function(err, data) {
    let row = {};
    if (err) {
      res.status(500).send(err);
      return;
    }
    console.log(data);
    if (data.rows.length > 0) {
      row = data.rows[0];
    }
    res.status(200)
    .json({
      status: 'success',
      data: row
    });

  })
}

function saveBed(req, res, next) {
  let body='';

  req.on('data', function(data) {
    console.log(body+=data.toString());
  });

  req.on('end', function() {
    let params = JSON.parse(body);
    console.log(params);

    if (params.Id === undefined || params.Id === null) {
      query('INSERT INTO "Bed"("TypeId", "RoomId", "BuildingId", "Name") VALUES ($1, $2, $3, $4);',
        [params.TypeId,params.RoomId, params.BuildingId, params.Name])
      .then(function(data) {
        console.log('got this data', data);
        res.status(200)
          .json({
            success: true,
            message: 'Bed added'
          })
      })
      .catch((err) => {
        console.log('got error ', err);
        return next(err);
      })
    } else {
      console.log('doing an update');

      query('UPDATE "Bed" SET "TypeId"=$1, "RoomId"=$2, ' +
      '"BuildingId"=$3, "Name"=$4	WHERE "Id" = $5', [params.TypeId,params.RoomId, params.BuildingId, params.Name, params.Id], function(response) {
        console.log(response);
        res.status(200).json({
          success: true,
          message: 'Bed Updated'
        })
      })
    }

  })

}
module.exports = {
  getAllBeds: getAllBeds,
  getBed: getBed,
  saveBed: saveBed
}
