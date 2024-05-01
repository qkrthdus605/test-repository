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
  var youtubers = {};

  if (youtuber_db.size !== 0) {
    youtuber_db.forEach(function (value, key) {
      youtuber_db[key] = value;
    });
    res.json(youtubers);
  } else {
    res.status(404).json({
      message: "조회할 유튜버가 없습니다",
    });
  }

  res.json(youtubers);
});

// 개별 조회
app.get("/youtubers/:id", function (req, res) {
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
app.post("/youtubers", (req, res) => {
  const channelTitle = req.body.channelTitle;
  if (channelTitle) {
    // Map(db)에 저장(put)해줘야 함
    youtuber_db.set(id++, req.body);
    // id가 +1로 바로 업데이트 되기 때문에 -1한 값을 넣어줘야 함
    res.status(201).json({
      message: `${
        youtuber_db.get(id - 1).channelTitle
      }님, 유튜버 생활을 응원합니다!`,
    });
  } else {
    res.status(400).json({
      message: "요청 값을 제대로 보내주세요",
    });
  }
});

app.delete("/youtubers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var youtuber = youtuber_db.get(id);
  // 예외 처리
  if (youtuber == undefined) {
    res.json({
      message: `요청하신 ${id}번 유튜버는 가입된 유튜버가 아닙니다.`,
    });
  } else {
    const name = youtuber.channelTitle;
    youtuber_db.delete(id);

    res.json({
      message: `${name}님, byebye!`,
    });
  }
});

app.delete("/youtubers", (req, res) => {
  // 유튜버가 존재하지 않을 경우 '삭제할 유튜버가 없습니다.'
  // db에 값이 1개 이상이면 삭제
  var msg = "";
  if (youtuber_db.size >= 1) {
    youtuber_db.clear();
    msg = "전체 유튜버가 삭제되었습니다.";
  } else {
    msg = "삭제할 유튜버가 없습니다.";
  }

  res.json({
    message: msg,
  });
});

app.put("/youtubers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  var youtuber = youtuber_db.get(id);
  var oldTitle = youtuber.channelTitle;

  if (youtuber == undefined) {
    res.json({
      message: `요청하신 ${id}는 없는 유튜버입니다.`,
    });
  } else {
    var newTitle = req.body.channelTitle;

    youtuber.channelTitle = newTitle;

    youtuber_db.set(id, youtuber);

    res.json({
      message: `${oldTitle}님, 채널명이 ${newName}으로 변경되었습니다.`,
    });
  }
});
