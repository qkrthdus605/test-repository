const fs = require("fs");
// fs를 통해서 파일을 읽어줌
const main_view = fs.readFileSync("./main.html", "utf-8");

const mariadb = require("./database/connect/mariadb");

function main(res) {
  console.log("main");

  mariadb.query("SELECT * FROM product", function (err, rows) {
    console.log(rows);
  });

  res.writeHead(200, { "Content-Type": "text/html" });
  // 받아온 html을 그려주면 됨
  res.write(main_view);
  res.end();
}

// 메인을 보여주는 함수를 만들었듯이
// 이미지들을 보여주는 함수도 만들어주면 됨
function redRacket(res) {
  fs.readFile("./img/redRacket.png", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
}

function blueRacket(res) {
  fs.readFile("./img/blueRacket.png", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
}

function blackRacket(res) {
  fs.readFile("./img/blackRacket.png", function (err, data) {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(data);
    res.end();
  });
}

let handle = {};
handle["/"] = main;

/* img 경로 */
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;
