const express = require("express");
const app = express();

app.listen(1234);

// http://localhost:3000이 앞에 생략되어 있는 것임
// 뒤에 올 경로만 지정해주면 됨
app.get("/", function (req, res) {
  res.send("hello express!");
});

let nodejsBook = {
  title: "node book",
  price: 30000,
  description: "good",
};

app.get("/products/1", function (req, res) {
  res.json(nodejsBook);
});
