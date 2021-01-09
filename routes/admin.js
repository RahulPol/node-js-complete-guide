const express = require("express");

const router = express.Router();

router.get("/add-product", (req, res, next) => {
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

router.post("/product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});

module.exports = router;
