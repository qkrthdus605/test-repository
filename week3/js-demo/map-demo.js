const arr = [1, 2, 3, 4, 5];

const forEachArr = arr.forEach(function (a, b, c) {
  return a * 2;
});

const mapArr = arr.map(function (a, b, c) {
  return a * 2;
});

console.log(forEachArr);
console.log("========");
console.log(mapArr);
