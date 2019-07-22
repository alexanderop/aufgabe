const express = require('express');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const updateCurrencyData = require('./routes/updateCurrencyData');
const getRatesFromSql = require('./routes/getRatesFromSql');

const app = express();
// Create connection

app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;


app.use('/api', index);
// Route is used to update the Currency in the MYSQL Database
app.use('/api/updateCurrencyData', updateCurrencyData);
// Route is used to get the current Data in the mysql Database
app.use('/api/getRatesFromSql', getRatesFromSql);

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
