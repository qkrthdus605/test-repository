const express = require("express");
const app = express();
app.listen(7777);
app.use(express.json());

let db = new Map();
var id = 1;

// 로그인
app.post("/login", (req, res) => {
  console.log(req.body);

  // userId가 db에 저장된 회원인지 확인
  const { userId, password } = req.body;
  var loginUser = {};

  db.forEach((user, id) => {
    if (user.userId === userId) {
      loginUser = user;
    }
  });

  // userId 값을 못 찾았으면
  if (isExist(loginUser)) {
    // pwd도 맞는지 비교
    if (loginUser.password === password) {
      console.log("비밀번호 일치");
    } else {
      console.log("비밀번호 불일치");
    }
  } else {
    console.log("없는 아이디");
  }
});

function isExist(obj) {
  if (Object.keys(obj).length) {
    return true;
  } else {
    return false;
  }
}
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
