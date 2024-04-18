const mariadb = require("mysql");

// 데이터베이스 접속 관련 정보를 쓴다고 생각하면 됨
const conn = mariadb.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "Tennis",
});

module.exports = conn;
