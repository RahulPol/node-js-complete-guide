const http = require("http");

const handler = require("./assignmentRoutes");

const server = http.createServer(handler);

server.listen("3000");
