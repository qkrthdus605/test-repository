const mariadb = require("./database/connect/mariadb");

function main(res) {
  console.log("main");

  // sql쿼리를 던질 수 있음
  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);
  });

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Main Page!");
  res.end();
}

function login(res) {
  console.log("login");

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Login Page!");
  res.end();
}

let handle = {}; // key:value 쌍으로 이루어진 객체
handle["/"] = main;
handle["/login"] = login;

exports.handle = handle;
