const fs = require("fs");
// fs를 통해서 파일을 읽어줌
const main_view = fs.readFileSync("./main.html", "utf-8");
const orderlist_view = fs.readFileSync("./orderlist.html", "utf-8");

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

function order(res, productId) {
  res.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query(
    "INSERT INTO orderlist VALUES (" +
      productId +
      ", '" +
      new Date().toLocaleDateString() +
      "');",
    function (err, rows) {
      console.log(rows);
    }
  );

  res.write("order page");
  res.end();
}

function orderlist(res) {
  console.log("orderlist");
  res.writeHead(200, { "Content-Type": "text/html" });

  mariadb.query("SELECT * FROM orderlist", function (err, rows) {
    // orderlist.html에서 데이터베이스로 받아와야 하는 부분을
    // 차례대로 그려주는 과정
    res.write(orderlist_view);

    rows.forEach((el) => {
      res.write(
        "<tr>" +
          "<td>" +
          el.product_id +
          "</td>" +
          "<td>" +
          el.order_date +
          "</td>" +
          "</tr>"
      );
    });
    res.write("</table>");
    res.end();
  });
}

let handle = {};
handle["/"] = main;
handle["/order"] = order;
handle["/orderlist"] = orderlist;

/* img 경로 */
handle["/img/redRacket.png"] = redRacket;
handle["/img/blueRacket.png"] = blueRacket;
handle["/img/blackRacket.png"] = blackRacket;

exports.handle = handle;
