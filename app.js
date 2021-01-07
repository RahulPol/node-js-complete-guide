const http = require("http");
// added express dependency
const express = require("express");
// to parse request body
const bodyParser = require("body-parser");

// to create request listener through express, we need to initialize it.
const app = express();

app.use(bodyParser.urlencoded());

//Middleware - consider middleware as small pieces of code that your request goes through
// before it is handled by final handler.
// For eg. you can add a middleware to log the request info, then next middleware to sanitize
// request, then to final handler to process business logic where you will send response(res.send()).

// following is a custom middleware that adds timestamp of when request received. Middleware takes
// three argument req, res and next
app.use((req, res, next) => {
  console.log(
    "Request arrived at: ",
    new Date().toISOString() + "for path:",
    req.url
  );
  // next allows you to send request to next middleware
  next();
});

// Note: always add specific route handlers above / handler as the code executes in top
// to bottom way
app.use("/add-product", (req, res, next) => {
  // since we are not calling next(), the next middleware won't be called
  // and the chain ends here.
  res.send(`
    <html>
      <head>
        <title>Add Product</title>
      </head>
      <body>
        <form action="/product" method="POST">
            Product: <input name="productName" type="text" />
            <button type="submit">Add Product</button>
        </form>
      </body>
    </html>
  `);
});

// you can omit next if you are not using it.
app.use("/product", (req, res) => {
  console.log(req.body);
  // instead of using location, use redirect
  res.redirect("/");
});

// handle root url request
app.use("/", (req, res, next) => {
  res.send("<h1>Hello from Express!</h1>");
});

// now pass that request listener to your server.
// const server = http.createServer(app);
// server.listen("3000");

// Or you can use listen method of express, it does exactly the same thing
// just check here https://github.com/expressjs/express/blob/master/lib/application.js
// and search from listen
app.listen(3000);
