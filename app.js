const http = require("http");
// added express dependency
const express = require("express");

// to create request listener through express, we need to initialize it.
const app = express();

//Middleware - consider middleware as small pieces of code that your request goes through
// before it is handled by final handler.
// For eg. you can add a middleware to log the request info, then next middleware to sanitize
// request, then to final handler to process business logic where you will send response(res.send()).

// following is a custom middleware that adds timestamp of when request received. Middleware takes
// three argument req, res and next
app.use((req, res, next) => {
  console.log(new Date().toISOString());
  // next allows you to send request to next middleware
  next();
});

// just another middleware
app.use((req, res, next) => {
  console.log("I am in another middleware");
  res.send("<h1>Hello from Express!</h1>");
});

// now pass that request listener to your server.
// const server = http.createServer(app);
// server.listen("3000");

// Or you can use listen method of express, it does exactly the same thing
// just check here https://github.com/expressjs/express/blob/master/lib/application.js
// and search from listen
app.listen(3000);
