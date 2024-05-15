const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { body, param, validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (err.isEmpty()) {
    return next();
  } else {
    return res.status(400).json(err.array());
  }
};

// 로그인
router.post(
  "/login",
  [
    body("email").notEmpty().isEmail().withMessage("이메일 확인 필요!"),
    body("password").notEmpty().isString().withMessage("비밀번호 확인 필요!"),
    validate,
  ],
  (req, res) => {
    // email이 db에 저장된 회원인지 확인
    const { email, password } = req.body;
    let sql = `SELECT * FROM users WHERE email = ?`;
    conn.query(
      sql,
      email,
      // 매개변수를 순서대로 받아서 err는 지우면 x
      function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        // results가 있으면 loginUser객체에 담아줌
        var loginUser = results[0];
        if (loginUser && loginUser.password == password) {
          // 토큰 발급
          const token = jwt.sign(
            {
              email: loginUser.email,
              name: loginUser.name,
            },
            process.env.PRIVATE_KEY,
            {
              // 1. 얼마 동안 유지될 지에 대한 유효시간
              // 2. 발행한 사람
              expiresIn: "30m",
              issuer: "soyeon",
            }
          );

          // 쿠키에는 여러가지 값이 들어갈 수 있어서 값에 대한 "이름"을 지정해서 넣어줘야 함
          res.cookie("token", token, {
            // Option
            httpOnly: true,
          });

          res.status(200).json({
            message: `${loginUser.name}님 로그인을 환영합니다`,
          });
        } else {
          // 하나라도 정보가 틀리면
          res.status(403).json({
            message: "이메일 또는 비밀번호가 틀렸습니다.",
          });
        }
      }
    );
  }
);

// 회원가입
router.post(
  "/join",
  [
    body("email").notEmpty().isEmail().withMessage("이메일 확인 필요!"),
    body("name").notEmpty().isString().withMessage("이름 확인 필요!"),
    body("password").notEmpty().isString().withMessage("비밀번호 확인 필요!"),
    body("contact").notEmpty().isString().withMessage("컨텍트 확인 필요!"),
    validate,
  ],
  (req, res) => {
    const { email, name, password, contact } = req.body;
    let sql = `INSERT INTO users (email, name, password, contact) VALUES (?, ?, ?, ?)`;
    let values = [email, name, password, contact];
    conn.query(
      // 여러개의 입력값을 보낼 때는 배열로 묶어서 보낸다
      // INSERT를 하면 별도의 results가 없다
      sql,
      values,
      function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        res.status(201).json(results);
      }
    );
  }
);

// 동일한 경로에서 메서드에 따라서 콜백함수만 메서드에 넘겨줄 수 있음
router
  .route("/users")
  .get(
    [
      body("email").notEmpty().isEmail().withMessage("이메일 확인 필요!"),
      validate,
    ],
    (req, res) => {
      let { email } = req.body;
      let sql = `SELECT * FROM users WHERE email = ?`;
      conn.query(
        // ?에 들어갈 변수의 이름을 ,를 찍고 그 다음에 써주면 된다
        sql,
        email,
        function (err, results) {
          if (err) {
            console.log(err);
            return res.status(400).end();
          }

          res.status(200).json(results);
        }
      );
    }
  )

  .delete(
    [
      body("email").notEmpty().isEmail().withMessage("이메일 확인 필요!"),
      validate,
    ],
    (req, res) => {
      let { email } = req.body;
      let sql = `DELETE FROM users WHERE email = ?`;
      conn.query(sql, email, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        if (results.affectedRows == 0) {
          return res.status(400).end();
        } else {
          res.status(200).json(results);
        }
      });
    }
  );

// // 회원 개별 조회
// router.get("/users/:id");

// // 회원 개별 탈퇴
// router.delete("/users/:id");

module.exports = router;
