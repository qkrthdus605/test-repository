const arr = [1, 2, 3, 4, 5];

arr.forEach(function (a, b, c) {
  console.log(a);
  console.log(b);
  console.log(c);
});

let map = new Map();

map.set(7, "seven");
map.set(8, "eight");
map.set(9, "nine");

// map.forEach(funciton(a, b, c) {
// 	console.log(`a: ${a}, b: ${b}, c: ${c}`)
// })
