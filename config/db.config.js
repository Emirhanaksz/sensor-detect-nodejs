// Mysql İmpotation
const mysql = require("mysql");

// Dotenv İmportation
require("dotenv").config();

// DB Connection
const dbConn = mysql.createPool({
  connectionLimit: process.env.CONNECTIONLIMIT,
  host: process.env.HOST,
  user: process.env.USERDB,
  password: process.env.PASSWORD,
  database: process.env.DB,
  port: process.env.DBPORT,
  debug: false,
});

// Exporting
module.exports = dbConn;
