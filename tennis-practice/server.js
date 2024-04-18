let http = require("http");
let url = require("url");

function start(route, handle) {
  function onRequest(req, res) {
    let pathname = url.parse(req.url).pathname;

    route(pathname, handle, res);
  }

  http.createServer(onRequest).listen(8888);
}

exports.start = start;
