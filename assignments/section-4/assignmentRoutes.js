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

const handler = (req, res) => {
  const url = req.url;
  const method = req.method;
  console.log(url);
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write(`<h1>hello from assignment server!</h1>`);
    res.write(`
        <form action="/create-user" method="POST">
           User: <input name="username" type="text" />
           <button type="submit">Add User</button>
        </form>
      `);
    res.end();
  } else if (url === "/users") {
    res.setHeader("Content-Type", "text/html");
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
    res.write(output);
    res.end();
  } else if (url === "/create-user" && method === "POST") {
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
      res.end();
    });
  }
};

module.exports = handler;
