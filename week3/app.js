const express = require("express");
const app = express();
const port = 3000;

// 루트 url에 대한 응답
app.get("/", (req, res) => {
  res.send("hello world");
});

//req로 날아오는 body값을 json으로 읽을 수 있도록 설정
app.use(express.json());
// Post test
app.post("/test", function (req, res) {
  // body에 숨겨져서 들어온 데이터를 화면에 뿌려주자
  console.log(req.body.message);
  res.json(req.body);
});

// 3000번 포트와 연결
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
