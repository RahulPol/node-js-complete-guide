const http = require("http");
const fs = require("fs");
const { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } = require("constants");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    // Note: the name attribute of input is very imp, if not present
    // you can not parse the body of req, basically the form element
    // here, will create a post request for you and in body of post
    // it will create mapping(key value pair) of all input type elements
    // and send it to server.
    // just check Form Data in headers of network request
    res.write(`
    <html>
      <head>
        <title>Enter message</title>
      </head>
      <body>
        <form action="/message" method="POST">        
          <input name="message" type="text">
          <button type="submit">Send</button>
        </form>
      </body>
    </html>
  `);
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    // the data sent in req is not available as plain or json text
    // in node, instead it is sent at chunks of bytes which you need
    // to aggregate in single container like array and once all chunks
    // are read you can parse them into variables
    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      // to get message value of request body
      const message = parsedBody.split("=")[1];
      console.log(parsedBody);
      // following is blocking code, why? because it blocks your server
      // basically js runtime to wait until the file is written, which is
      // is CPU heavy, what if you have another request coming in, you can't
      // cater to that request as your runtime is busy. So to avoid this
      // problem NodeJs provides concept of non-blocking, this will allow you
      // to run code asynchronously
      // fs.writeFileSync("message.txt", message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("location", "/");
        res.end();
      });
    });
  }
  res.end();
});

server.listen("3000");
