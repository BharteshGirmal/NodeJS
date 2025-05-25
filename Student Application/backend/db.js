const mysql = require("mysql2");

const DbConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "nadsoft",
});

module.exports = DbConnection.promise();
