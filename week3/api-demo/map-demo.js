const express = require("express");
const app = express();

app.listen(1234);

let db = new Map();

let notebook = {
  productName: "Notebook",
  price: 2000000,
};

let cup = {
  productName: "Cup",
  price: 10000,
};

let chair = {
  productName: "Chair",
  price: 300000,
};
db.set(1, notebook); // key로 value를 찾을 수 있는 한 쌍을 저장
db.set(2, cup);
db.set(3, chair);

app.get("/:id", function (req, res) {
  const id = parseInt(req.params.id);

  if (db.get(id) == undefined) {
    res.json({
      message: "없는 데이터",
    });
  } else {
    product = db.get(id);
    // 파라미터로 받아온 값이 곧 id
    // product 객체에 id필드를 추가해줌
    product.id = id;

    res.json(product);
  }
});

// console.log(db); // { 1 => 'notebook', 2 => 'cup', 3 => 'chair' }
// console.log(db.get(1)); // notebook출력
