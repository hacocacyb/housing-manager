const express = require('express');

const bodyParser = require('body-parser');
//var jsonParser = bodyParser.json()
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: 'application/*+json' }));
app.set('port', (process.env.PORT || 3001));

var beds = require('./BedQueries.js');
var codes = require('./CodeQueries.js');
var buildings = require('./BuildingQueries.js');
var People = require('./peopleQueries.js');
var Visit = require('./visitQueries.js');

app.get('/api/codes/getBedTypes', codes.getBedTypes);
app.get('/api/beds/getAll', beds.getAllBeds);
app.get('/api/beds/getBed/:id', beds.getBed);
app.put('/api/beds', beds.saveBed);

app.get('/api/buildings/getAll', buildings.getAll);
app.get('/api/buildings/get/:id', buildings.get);
app.put('/api/buildings/', buildings.save);

app.get('/api/people/getAll', People.getAll);
app.get('/api/people/get/:id', People.get);
app.put('/api/people/', People.save);

app.get('/api/visits/getAll', Visit.getAll);
app.get('/api/visits/get/:id', Visit.get);
app.put('/api/visits/', Visit.save);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});















app.post('/api/addItem', (req, res) => {
  let text = req.body.text || ('New Text ' + new Date().getTime());
  const query = client.query(
    `INSERT INTO items(text) 	VALUES ($1)`, [text]
  )
  query.on('error', function(err) {
    console.log('reached an error from query');
  });

  query.on('end', (result) => {
    res.json(result);
  });
})


app.get('/api/items', (req, res) => {
  const param = req.query.q;

  if (false  && !param) {
    res.json({
      error: 'Missing required parameter `q`',
    });
    return;
  }

  const query = client.query('SELECT * FROM items');

  query.on('error', function(err) {
    console.log('reached an error from query');
  });
  query.on('end', (result) => {

    res.json({
      rows : result.rows,
      rowCount: result.rowCount
    });
  });

});
