const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  database: "node-complete",
  user: "root",
  password: "adminadmin",
});

module.exports = pool.promise();
