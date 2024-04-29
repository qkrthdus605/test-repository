const express = require("express");
const app = express();

app.listen(1234);

// http://localhost:3000이 앞에 생략되어 있는 것임
// 뒤에 올 경로만 지정해주면 됨
app.get("/hello", function (req, res) {
  res.json({
    say: "안녕하세요",
  });
});

app.get("/bye", function (req, res) {
  res.json({
    say: "안녕히가세요",
  });
});

app.get("/nicetomeetyou", function (req, res) {
  res.json({
    say: "만나서 반갑습니다",
  });
});
