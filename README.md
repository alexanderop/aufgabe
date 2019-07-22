2. ein Api aufruf fertig mit konstem aufruf
3. Api in frotnend einbinden mit möglichkeit für default werten


5. Api aurfuf zum fetchen von externer api zu mysql Datenbank
6. api aufruf der die daten dann wirklich von mysql datenbank bekommt



{
  "success":true,
  "terms":"https:\/\/currencylayer.com\/terms",
  "privacy":"https:\/\/currencylayer.com\/privacy",
  "timestamp":1563725706,
  "source":"USD",
  "quotes":{
    "USDEUR":0.890195,
    "USDCHF":0.98164
  }
}



5d8552a366e9bee39a8cf86d3cd0caa1


git remote add origin git@github.com:alexanderop/aufgabe.git


# aufgabe

## Backend

### how to start 
Before you can use the Backend you need to create a db for your local mysql server



```sql
CREATE TABLE currency_exchange_rate (
  currency_code_from VARCHAR(3) NOT NULL,
  currency_code_to VARCHAR(3) NOT NULL,
  rate numeric(15,4) NOT NULL,
  PRIMARY KEY (currency_code_from, currency_code_to)
);
```


after you created the db you need to insert two rows

```sql
INSERT INTO `currency_exchange_rate` (`currency_code_from`, `currency_code_to`, `rate`) VALUES ('EUR', 'USD', '1,12')
INSERT INTO `currency_exchange_rate` (`currency_code_from`, `currency_code_to`, `rate`) VALUES ('EUR', 'CHF', '1,12')
);
```

and after that just run the node app with

```bash
npm i
npm run start
```
### Api
1. /api/updateCurrencyData is used to update the currency data on mysql with the help of a external api (you need a api key for this)
2. /api/getRatesFromSql is used to get the stored table in the mysql database

## Frontend
```bash
npm i
npm run serve
```


## Discussion


1.a Primary key should be as small as necessary (prefer nuermic type) Primary keys should never change.

1.b I would prefer a String because the Currenices could be changed if the application needs to support more than three. I

1.b Advantages and Disadvantages according to [2].

### Disadvantage:
1.	No standard SQL
2.	Terrible to maintain easily
3.	Management of valid values should be done in application	Advantage:
1.	Safe Data depending on the size of the varchar
2.	Better Overview of the table3.	

### Advantage:
1. Safe Data depending on the size of the varchar
2.	Better Overview of the table

1.d Float and Double is stored as a fraction, so precession gets lost for example 160.01 as float is 1.600999999999999996 (1). Best way is to store as decimal if not supported then numerical or integer. Decimal is also bigh enough -1.0 * 10^28 to +7.9 * 10^28.


### Appendix:
[1] http://www.yacoset.com/how-to-handle-currency-conversions

[2] http://ronaldbradford.com/blog/to-enum-or-not-to-enum-2006-01-22/

