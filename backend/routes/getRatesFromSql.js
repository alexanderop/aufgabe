const express = require('express');
const mysqlClient = require('../db/db');

const router = express.Router();

router.get('/', (req, res) => {
  const sqlSelect = 'SELECT * FROM `currency_exchange_rate` ';
  // eslint-disable-next-line consistent-return
  mysqlClient.query(sqlSelect, (error, results) => {
    if (error) {
      return console.error(error.message);
    }
    res.json(results);
  });
});

module.exports = router;
