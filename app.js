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
      fs.writeFileSync("message.txt", message);
      console.log(parsedBody);

      // Now you have written your code in callback, but the callback
      // will always execute in future so if you have written something
      // outside of this callback which we have written res.end(), it will
      // end the response and you wont be able to redirect.
      // [remove return of this event to reproduce]
      // to avoid such issue return req.on() method so that statement
      // after the event are not executed and once your callback executes
      // you can redirect
      res.statusCode = 302;
      res.setHeader("location", "/");
      res.end();
    });

    // Notice: we have written res status and header outside of end callback.
    // In this particular case we won't have problem as our response has nothing
    // to do with parsedBody, its a simple redirect. but if your response depends on
    // body you should write below statements in end callback
    // res.statusCode = 302;
    // res.setHeader("location", "/");
  }

  // if you omit following code, the client will be hung on the request as it never ends
  // to confirm it, comment following code and run the request from browser and check out
  // status of the request, it will be pending.
  res.end();
});

server.listen("3000");
