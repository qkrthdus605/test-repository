let server = require("./server");
// 외부 모듈을 사용하는 것처럼 route함수도 가져옴
let route = require("./route");
let requestHandler = require("./requestHandler");

// conn 모듈이 담기게 되고 connect로 연결
const mariadb = require("./database/connect/mariadb");
mariadb.connect();

// route.js파일의 route함수를 매개변수로 넣어줌
server.start(route.route, requestHandler.handle);
