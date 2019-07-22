const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodeSql',
});
connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Connected!:)');
  }
});
module.exports = connection;
