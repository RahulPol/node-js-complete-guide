const http = require("http");

const server = http.createServer((req, res) => {
  console.log(req.url, req.method, req.headers);

  res.setHeader("Content-Type", "text/html");
  res.write(`
    <html>
      <head>
        <title>My first page</title>
      </head>
      <body>
        <h1>Hello from my Node.js Server!</h1>
      </body>
    </html>
  `);

  // if you omit following code, the client will be hung on the request as it never ends
  // to confirm it, comment following code and run the request from browser and check out
  // status of the request, it will be pending.
  res.end();
});

server.listen("3000");
