const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
router.use(express.json());

// 로그인
router.post("/login", (req, res) => {
  // email이 db에 저장된 회원인지 확인
  const { email, password } = req.body;
  let sql = `SELECT * FROM users WHERE email = ?`;
  conn.query(
    sql,
    email,
    // 매개변수를 순서대로 받아서 err는 지우면 x
    function (err, results) {
      // results가 있으면 loginUser객체에 담아줌
      var loginUser = results[0];
      if (loginUser && loginUser.password == password) {
        res.status(200).json({
          message: `${loginUser.name}님 로그인을 환영합니다`,
        });
      } else {
        // 하나라도 정보가 틀리면
        res.status(404).json({
          message: "이메일 또는 비밀번호가 틀렸습니다.",
        });
      }
    }
  );
});

// 회원가입
router.post("/join", (req, res) => {
  if (req.body == {}) {
    res.status(400).json({
      message: "입력 값을 다시 확인해주세요",
    });
  } else {
    const { email, name, password, contact } = req.body;
    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
    let values = [email, name, password, contact];
    conn.query(
      // 여러개의 입력값을 보낼 때는 배열로 묶어서 보낸다
      // INSERT를 하면 별도의 results가 없다
      sql,
      values,
      function (err, results) {
        res.status(201).json(results);
      }
    );
  }
});

// 동일한 경로에서 메서드에 따라서 콜백함수만 메서드에 넘겨줄 수 있음
router
  .route("/users")
  .get((req, res) => {
    let { email } = req.body;
    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(
      // ?에 들어갈 변수의 이름을 ,를 찍고 그 다음에 써주면 된다
      sql,
      email,
      function (err, results) {
        res.status(200).json(results);
      }
    );
  })

  .delete((req, res) => {
    let { email } = req.body;
    let sql = `DELETE FROM users WHERE email = ?`;
    conn.query(sql, email, function (err, results) {
      res.status(200).json(results);
    });
  });

// // 회원 개별 조회
// router.get("/users/:id");

// // 회원 개별 탈퇴
// router.delete("/users/:id");

module.exports = router;
