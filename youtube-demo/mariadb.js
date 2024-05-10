const mysql = require("mysql2");

// 데이터베이스 연결
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Youtube",
  dateStrings: true,
});

module.exports = connection;
