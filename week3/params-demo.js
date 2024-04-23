const express = require("express");
const app = express();

app.listen(1234);

// url에 넘어오는 숫자를 그대로 num에 넣고 싶을 때
app.get("/products/:n", function (req, res) {
  // : => 나한테 url로 매개변수를 전달해준다
  // 이건 url을 그대로 받아들이는게 아니라 req.params로 변수 값을 담아온다
  // :n의 의미 - products/ __ 빈칸에 오는 값을 n이라는 변수에 담아달라는 의미
  res.json({
    num: req.params.n,
  });
});
