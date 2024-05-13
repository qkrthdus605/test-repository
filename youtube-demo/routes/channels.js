const express = require("express");
const router = express.Router();
const conn = require("../mariadb");
const { body, param, validationResult } = require("express-validator");

router.use(express.json());

// validate 모듈 생성
const validate = (req, res) => {
  const err = validationResult(req);

  // 에러가 있을 때의 처리만 해주고 있음
  // 에러가 없을 때 콜백으로 넘어가도록 처리가 필요함 (미들웨어로 선언해서 발생하는 문제)
  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  }
};

// 채널 전체 조회
// 채널 개별 생성
router
  .route("/")
  .get(
    // url에 들어와서 콜백 부르기 전에 필요한 요청을 넣을 자리
    [body("userId").notEmpty().isInt().withMessage("숫자 입력해!"), validate],
    (req, res) => {
      var { userId } = req.body;

      let sql = `SELECT * FROM channels WHERE user_id = ?`;
      conn.query(sql, userId, function (err, results) {
        if (err) {
          console.log(err);
          return res.status(400).end();
        }

        if (results.length) {
          res.status(200).json(results);
        } else {
          notFoundChannel(res);
        }
      });
    }
  )

  .post(
    // ,로 구분해서 여러가지 유효성 검사를 할 수는 없다
    // 배열로 !
    [
      body("userId").notEmpty().isInt().withMessage("숫자 입력해!"),
      body("name").notEmpty().isString().withMessage("문자로 입력!"),
    ],
    (req, res) => {
      const err = validationResult(req);

      if (!err.isEmpty()) {
        // 400 코드를 보냄과 함께 함수 종료
        return res.status(400).json(err.array());
      }

      const { name, userId } = req.body;

      let sql = `INSERT INTO channels (name, user_id) VALUES (?, ?)`;
      let values = [name, userId];
      conn.query(sql, values, function (err, results) {
        // sql 에서 에러가 발생할 경우에 대한 에러처리
        if (err) {
          console.log(err);
          return res.status(400).end();
        }
        res.status(201).json(results);
      });
    }
  );

// 채널 개별 수정
// 채널 개별 삭제
// 채널 개별 조회
router
  .route("/:id")
  .put(
    [
      param("id").notEmpty().withMessage("채널 id 필요!"),
      body("name").notEmpty().isString().withMessage("채널명 필요!"),
    ],
    (req, res) => {
      const err = validationResult(req);

      if (!err.isEmpty()) {
        // 400 코드를 보냄과 함께 함수 종료
        return res.status(400).json(err.array());
      }

      let { name } = req.body;
      let { id } = req.params;
      id = parseInt(id);

      let sql = `UPDATE channels SET name=? WHERE id=?`;
      let values = [name, id];

      conn.query(sql, values, function (err, results) {
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
  )
  .delete(param("id").notEmpty().withMessage("채널 id 필요!"), (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json(err.array());
    }

    let { id } = req.params;
    id = parseInt(id);

    let sql = `DELETE FROM channels WHERE id = ?`;
    conn.query(sql, id, function (err, results) {
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
  })

  .get(param("id").notEmpty().withMessage("채널 id 필요!"), (req, res) => {
    const err = validationResult(req);

    if (!err.isEmpty()) {
      return res.status(400).json(err.array());
    }

    // 유효성 검사 통과하면 진행
    let { id } = req.params;
    id = parseInt(id);

    let sql = `SELECT * FROM channels WHERE id = ?`;
    conn.query(sql, id, function (err, results) {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }

      if (results.length) {
        res.status(200).json(results);
      } else {
        notFoundChannel(res);
      }
    });
  });

function notFoundChannel(res) {
  res.status(404).json({
    message: "채널 정보를 찾을 수 없습니다.",
  });
}

module.exports = router;
