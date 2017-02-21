var { query } = require('./query.js');
var { parseRequest } = require('./httpHelpers.js');
var fs = require('fs');

function getAll(req, res, next) {
  var sql = fs.readFileSync('./sql/getBuildings.sql').toString();

  query(sql, (err, response) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200);
      res.json({
        status: 'success',
        data: response.rows,
        message: 'Retrieved all Buildings'
      });

    }
  })
}

function get(req, res, next) {
  console.log(req.params);
  let id = req.params.id;
  if (!id) {
    res.error('No id was included in request');
  }
  query('select * from "Building" where "Building"."Id" = $1', [id], function(err, data) {

    if (err) {
      res.error(err);
    }
    let row = {};

    if (data.rows.length > 0) {
      row = data.rows[0];
    }
    res.status(200).json({
      status: 'success',
      data: data.rows[0]
    });
  });
}

function save(req, res, next) {

  parseRequest(req, function(params) {
    console.log('save building body', params);
    let values = [params.Name,params.Addr1, params.Addr2, params.City, params.State, params.Zip];
    let fields = ['Name', 'Addr1', 'Addr2', 'City', 'State', 'Zip'];
    let fieldsString = '"' + fields.join('","') + '"';
    let dollarString = function(n) {
      let string = '';
      for (let i=1;i<=n;i++) {
        if (i>1) string+= ', ';
        string += '$'+i;
      }
      return string;
    }

    if (params.Id === undefined || params.Id === null) {
      console.log('INSERT INTO "Building"(' + fieldsString + ') VALUES (' + dollarString(fields.length) + ')');
      query({
        text: 'INSERT INTO "Building"(' + fieldsString + ') VALUES (' + dollarString(fields.length) + ')',
        values: values
      }, function(err, data) {
        console.log('got this data', err, data);
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json({
            success: true,
            message: 'Building added'
          })
        }
      });
    } else {
      console.log('doing an update');
      let qry ='UPDATE "Building" SET "Name"=$1, "Addr1"=$2, ';
      qry += '"Addr2"=$3, "City"=$4,	"State"=$5, "Zip"=$6 WHERE "Id" = $7';
      values.push(params.Id);
console.log('***\n' + qry + '***\n' + values);
      query({
        text: qry,
        values: values
      }, function(err, response) {
      if (err) {
          res.status(500).json({
            success: false,
            error: err.message
          });
        } else {
          res.status(200).json({
            success: true,
            message: 'Building Updated'
          })
        }
      })
    }


  })

}
module.exports = {
  getAll: getAll,
  get: get,
  save: save
}
