// express module setting
const express = require("express");
const app = express();

app.listen(1234);

// create db
let youtuber_db = new Map();
var id = 1;

let youtuber1 = {
  channelTitle: "십오야",
  sub: "593만명",
  videoNum: "993개",
};

let youtuber2 = {
  channelTitle: "침착맨",
  sub: "227만명",
  videoNum: "6.6천개",
};

let youtuber3 = {
  channelTitle: "테오",
  sub: "54.8만명",
  videoNum: "726개",
};

youtuber_db.set(id++, youtuber1);
youtuber_db.set(id++, youtuber2);
youtuber_db.set(id++, youtuber3);

// 전체 조회
app.get("/youtubers", (req, res) => {
  res.json({
    message: "dd",
  });
});

// 개별 조회
app.get("/youtuber/:id", function (req, res) {
  const id = parseInt(req.params.id);

  const youtuber = youtuber_db.get(id);

  if (youtuber_db.get(id) == undefined) {
    res.json({
      message: "없는 유튜버입니다.",
    });
  } else {
    res.json(youtuber);
  }
});

app.use(express.json()); // 미들웨어 설정
// req: body <= channelTitle, sub=0, videoNum=0
// res: channelTitle님, 유튜버 생활을 응원합니다
app.post("/youtuber", (req, res) => {
  console.log(req.body);
  // Map(db)에 저장(put)해줘야 함
  youtuber_db.set(id++, req.body);

  // id가 +1로 바로 업데이트 되기 때문에 -1한 값을 넣어줘야 함
  res.json({
    message: `${
      youtuber_db.get(id - 1).channelTitle
    }님, 유튜버 생활을 응원합니다!`,
  });
});
