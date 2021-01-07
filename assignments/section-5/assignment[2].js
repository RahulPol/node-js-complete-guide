// To start the assignment open current folder path in cmd and type nodemon "assignment[2].js"

const express = require("express");

const app = express();
const users = [
  "V G Pol",
  "J V Pol",
  "R V Pol",
  "S V Pol",
  "P V Pol",
  "P R Pol",
  "K P Pol",
  "A R Pol",
];

app.use((req, res, next) => {
  console.log("first middleware");
  next();
});

app.use((req, res, next) => {
  console.log("second middleware");
  next();
});

app.use("/create-user", (req, res, next) => {
  if (req.method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const userName = parsedBody.split("=")[1];
      users.push(userName);
      console.log(users);
      res.statusCode = 302;
      res.setHeader("location", "/");
      res.send();
    });
  }
  res.statusCode = 403;
  res.send();
});

app.use("/users", (req, res, next) => {
  let output = `
    <html>
        <head>
            <title>users</title>
        </head>
        <body>
            <ul>`;

  users.forEach((user) => {
    output += `<li>${user}</li>`;
  });

  output += `
        </ul>
      </body>
    </html>`;
  res.send(output);
});

app.use("/", (req, res, next) => {
  res.send(`
    <html>
      <head>
        <title>Enter message</title>
      </head>
      <body>
        <form action="/create-user" method="POST">
            User: <input name="username" type="text" />
            <button type="submit">Add User</button>
        </form>
      </body>
    </html>
  `);
});

// checkout output at http://localhost:3001
app.listen(3001);
