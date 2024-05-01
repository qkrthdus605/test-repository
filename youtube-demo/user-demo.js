const express = require("express");
const app = express();
app.listen(7777);
app.use(express.json());

let db = new Map();
var id = 1;

// 로그인
app.post("/login", (req, res) => {});

// 회원가입
app.post("/join", (req, res) => {
  if (req.body == {}) {
    db.set(id++, req.body);

    res.status(201).json({
      message: `${db.get(id - 1).name}님 환영합니다!`,
    });
  } else {
    res.status(400).json({
      message: "입력 값을 다시 확인해주세요",
    });
  }
});

// 동일한 경로에서 메서드에 따라서 콜백함수만 메서드에 넘겨줄 수 있음
app
  .route("/users/:id")
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const user = db.get(id);

    if (user == undefined) {
      res.status(404).json({
        message: "회원 정보가 없습니다.",
      });
    } else {
      res.status(200).json({
        userId: user.userId,
        name: user.name,
      });
    }
  })
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    const user = db.get(id);

    if (user == undefined) {
      res.status(404).json({
        message: "회원 정보가 없습니다.",
      });
    } else {
      db.delete(id);
      res.status(200).json({
        message: `${user.name}님 다음에 또 뵙겠습니다.`,
      });
    }
  });

// // 회원 개별 조회
// app.get("/users/:id");

// // 회원 개별 탈퇴
// app.delete("/users/:id");
