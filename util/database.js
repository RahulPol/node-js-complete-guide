const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "adminadmin", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;

// Code for raw database connection

// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   database: "node-complete",
//   user: "root",
//   password: "adminadmin",
// });

// module.exports = pool.promise();
