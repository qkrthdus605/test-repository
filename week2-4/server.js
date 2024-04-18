// http 모듈을 부르기 위해 require 함수를 사용해 부름
// 이 모듈을 불러 http 라는 변수에 담아서 사용
let http = require("http");
let url = require("url");

// start 함수는 index.js에서 호출하는 것
function start(route, handle) {
  function onRequest(req, res) {
    // 요청받은 url을 parse함수로 읽음
    // pathname을 통해 경로가 어디인지를 알아낸다.
    // localhost:8888 뒤에 오는 경로가 곧 pathname
    let pathname = url.parse(req.url).pathname;

    // route함수를 알기 위해서는
    // 1. 라우터 모듈을 사용
    // 2. route 함수를 파라미터로 받음 (현재 코드)
    route(pathname, handle, res);
  }

  http.createServer(onRequest).listen(8888);
}

// export를 해줘야만 외부에서 사용이 가능함
exports.start = start;
