var { query } = require('./query.js');
var { parseRequest } = require('./httpHelpers.js');
var qh = require('./queryHelpers.js');
var fs = require('fs');

const tableName = '"Person"';

function getAll(req, res, next) {
  const qry = fs.readFileSync('./sql/getPeople.sql').toString();
  
  query(qry, (err, response) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200);
      res.json({
        status: 'success',
        data: response.rows,
        message: 'Retrieved all People'
      });

    }
  })
}

function get(req, res, next) {
  let id = req.params.id;

  if (!id || id === 'undefined') {
    res.status(500).send('No id was included in request');
    return;
  }
  query('select * from '+tableName+' where "Person"."Id" = $1', [id], function(err, data) {
    if (err) {
      res.status(500).send(err.message);
    }
    let row = {};
console.log(data);
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
    let values = [params.First,params.Last, params.Middle, params.Phone];
    let fields = ['First', 'Last', 'Middle', 'Phone'];
    let fieldsString = '"' + fields.join('","') + '"';

    if (params.Id === undefined || params.Id === null) {
      console.log('INSERT INTO '+tableName+'(' + fieldsString + ') VALUES (' + qh.dollarString(fields.length) + ')');
      query({
        text: 'INSERT INTO '+tableName+'(' + fieldsString + ') VALUES (' + qh.dollarString(fields.length) + ')',
        values: values
      }, function(err, data) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(200).json({
            success: true,
            message: 'Person added'
          })
        }
      });
    } else {
      let qry ='UPDATE '+tableName+' SET "First"=$1, "Last"=$2, ';
      qry += '"Middle"=$3, "Phone"=$4 WHERE "Id" = $5';
      values.push(params.Id);
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
            message: 'Person Updated'
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
