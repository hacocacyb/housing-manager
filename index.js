var express = require('express');
var path = require('path')

var app = express();
//serve static files
app.use(express.static(path.join(__dirname, '/build')))
app.set('port', (process.env.PORT || 3001));

var Beds = require('./server/endpoints/Bed.js');
var Codes = require('./server/endpoints/Code.js');
var Buildings = require('./server/endpoints/Building.js');
var People = require('./server/endpoints/People.js');
var Visits = require('./server/endpoints/Visit.js');
var Payments = require('./server/endpoints/Payment.js');

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
