const express = require('express');
const CurrencyLayerClient = require('currencylayer-client');
const mysqlClient = require('../db/db');

const router = express.Router();
// you need to provide your api key here
const apiKey = '';

router.get('/', (req, res) => {
  const client = new CurrencyLayerClient({ apiKey });
  // First get the currencies for EUR and CHF because of free Plan source must be USD
  client.live({ currencies: 'EUR,CHF', source: 'USD' }).catch((error) => {
    res.json(error);
  }).then(response => response).then((response) => {
    // if the Api was successful we need to convert
    // the correct raiting for EUR => USD and EUR => CHF
    const usdRaiting = 1 / response.quotes.USDEUR;
    // bad way to convert but the free plan donnt allow any other stuff so we have to go with that
    const chfRaiting = 1 * usdRaiting * response.quotes.USDCHF;
    // after we have the Raitings for eur and chf we need to update our mysql Datbase.
    // update statment
    const sqlUpdate = `UPDATE currency_exchange_rate
           SET rate= ?
           WHERE currency_code_from = ?
           AND
           currency_code_to = ?;`;
    // if there were more than two raitings better way would be to use objects and for loops

    const dataEurRating = [usdRaiting, 'EUR', 'USD'];
    const dataChfRating = [chfRaiting, 'EUR', 'CHF'];
    // eslint-disable-next-line consistent-return
    mysqlClient.query(sqlUpdate, dataEurRating, (error, results) => {
      if (error) {
        return console.error(error.message);
      }
      console.log('Rows affected:', results.affectedRows);
    });

    // eslint-disable-next-line consistent-return
    mysqlClient.query(sqlUpdate, dataChfRating, (error, results) => {
      if (error) {
        return console.error(error.message);
      }
      console.log('Rows affected:', results.affectedRows);
    });


    res.sendStatus(200);
  });
});

module.exports = router;
