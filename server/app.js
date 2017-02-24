var express = require('express');
var path = require('path')

var app = express();
//serve static files
app.use(express.static(path.join(__dirname, '/build')))

app.set('port', (process.env.PORT || 3001));

var Beds = require('./endpoints/Bed.js');
var Codes = require('./endpoints/Code.js');
var Buildings = require('./endpoints/Building.js');
var People = require('./endpoints/People.js');
var Visits = require('./endpoints/Visit.js');
var Payments = require('./endpoints/Payment.js');

app.get('/api/codes/bedTypes', Codes.getBedTypes);
app.get('/api/beds', Beds.getAllBeds);
app.get('/api/beds/:id', Beds.getBed);
app.put('/api/beds', Beds.saveBed);

app.get('/api/buildings', Buildings.getAll);
app.get('/api/buildings/:id', Buildings.get);
app.put('/api/buildings/', Buildings.save);

app.get('/api/people', People.getAll);
app.get('/api/people/:id', People.get);
app.put('/api/people/', People.save);

app.get('/api/visits', Visits.getAll);
app.get('/api/visits/:id', Visits.get);
app.put('/api/visits/', Visits.save);

app.get('/api/payments/:id', Payments.get);
app.put('/api/payments/', Payments.save);
app.get('/api/dashboard/billing', Payments.getWidgetInfo);

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
