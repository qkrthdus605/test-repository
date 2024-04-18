function main(res) {
  console.log("main");

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Main Page!");
  res.end();
}

function login(res) {
  console.log("login");

  res.writeHead(200, { "Content-Type": "text/html" });
  res.write("Login Page!");
  res.end();
}

let handle = {}; // key:value 쌍으로 이루어진 객체
handle["/"] = main;
handle["/login"] = login;

exports.handle = handle;
