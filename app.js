const http = require("http");

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`
    <html>
      <head>
        <title>Enter message</title>
      </head>
      <body>
        <form action="/message" method="POST">
          <input type="text">
          <button type="submit">Send</button>
        </form>
      </body>
    </html>
  `);
  }

  // if you omit following code, the client will be hung on the request as it never ends
  // to confirm it, comment following code and run the request from browser and check out
  // status of the request, it will be pending.
  res.end();
});

server.listen("3000");
