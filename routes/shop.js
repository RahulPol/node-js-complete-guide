const express = require("express");

const router = express.Router();

// handle root url request
router.get("/", (req, res, next) => {
  res.send("<h1>Hello from Express!</h1>");
});

module.exports = router;
