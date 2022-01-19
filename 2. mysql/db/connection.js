const mysql = require("mysql");
const Connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
});

Connection.connect(function (err) {
  if (err) throw err;
  console.log("Connected to mysql server!");
});

module.exports = { Connection };
