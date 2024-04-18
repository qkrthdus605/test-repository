function route(pathname, handle, res) {
  console.log("pathname: " + pathname);

  // handle에는 경로에 따라 콘솔을 찍어주는 함수가 지정되어 있음
  // pathname에 따라서 분배를 해주면 됨
  // handle[pathname] 의 타입은 함수
  if (typeof handle[pathname] == "function") {
    handle[pathname](res);
  } else {
    // 만약 함수가 아니라면 에러처리
    res.writeHead(404, { "Content-Type": "text/html" });
    res.write("404 Not Found!");
    res.end();
  }
}

exports.route = route;
