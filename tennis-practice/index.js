let server = require("./server");
let route = require("./route");
let requestHandler = require("./requestHandler");

const mariadb = require("./database/connect/mariadb");
mariadb.connect();

server.start(route.route, requestHandler.handle);
